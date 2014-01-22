require.config({
	paths: {
		"goo": "../../../src/goo"
	}
});

require([
	'goo/entities/GooRunner',
	'goo/entities/World',
	'goo/renderer/Material',
	'goo/renderer/shaders/ShaderLib',
	'goo/renderer/Camera',
	'goo/shapes/ShapeCreator',
	'goo/entities/components/CameraComponent',
	'goo/scripts/OrbitCamControlScript',
	'goo/entities/EntityUtils',
	'goo/entities/components/ScriptComponent',
	'goo/renderer/MeshData',
	'goo/entities/components/MeshRendererComponent',
	'goo/math/Vector3',
	'goo/renderer/light/PointLight',
	'goo/entities/components/LightComponent',

	'fsmpack/statemachine/FSMComponent',
	'fsmpack/statemachine/FSMSystem',
	'fsmpack/statemachine/State',
	'fsmpack/statemachine/Machine',
	'fsmpack/statemachine/actions/KeyDownAction',
	'fsmpack/statemachine/actions/KeyUpAction',
	'fsmpack/statemachine/actions/AddPositionAction',
	'fsmpack/statemachine/actions/NumberCompareAction',
	'fsmpack/statemachine/actions/MouseMoveAction',
	'fsmpack/statemachine/actions/MultiplyVariableAction',
	'fsmpack/statemachine/actions/GetPositionAction'
], function (
	GooRunner,
	World,
	Material,
	ShaderLib,
	Camera,
	ShapeCreator,
	CameraComponent,
	OrbitCamControlScript,
	EntityUtils,
	ScriptComponent,
	MeshData,
	MeshRendererComponent,
	Vector3,
	PointLight,
	LightComponent,
	FSMComponent,
	FSMSystem,
	State,
	Machine,
	KeyDownAction,
	KeyUpAction,
	AddPositionAction,
	NumberCompareAction,
	MouseMoveAction,
	MultiplyVariableAction,
	GetPositionAction
	) {
	'use strict';

	function getFSMComponent(ballEntity, dx, dy) {
		var fsmComponent = new FSMComponent();

		(function() {
			// ball mover
			var machineBall = new Machine('ball');
			fsmComponent.addMachine(machineBall);

			var stateSingular = new State('singular');
			machineBall.addState(stateSingular);
			stateSingular.addAction(new AddPositionAction(null, { position: ['dx', 'dy', 0] }));
		})();

		(function() {
			// ball collider
			var machineWall = new Machine('wall');
			fsmComponent.addMachine(machineWall);

			var stateMoving = new State('moving');

			fsmComponent.defineVariable('px', 0);
			fsmComponent.defineVariable('py', 0);
			fsmComponent.defineVariable('dx', 9);
			fsmComponent.defineVariable('dy', 11);

			machineWall.addState(stateMoving);
			stateMoving.addAction(new AddPositionAction(null, { entity: ballEntity, amountX: 'dx', amountY: 'dy', everyFrame: true }));
			stateMoving.addAction(new GetPositionAction(null, { entity: ballEntity, variableX: 'px', variableY: 'py' }));
			stateMoving.addAction(new NumberCompareAction(null, { leftHand: 'px', rightHand: -dx/2, transitions: { less: 'toFlipX' } }));
			stateMoving.addAction(new NumberCompareAction(null, { leftHand: 'px', rightHand:  dx/2, transitions: { greater: 'toFlipX' } }));
			stateMoving.addAction(new NumberCompareAction(null, { leftHand: 'py', rightHand: -dy/2, transitions: { less: 'toFlipY' } }));
			stateMoving.addAction(new NumberCompareAction(null, { leftHand: 'py', rightHand:  dy/2, transitions: { greater: 'toFlipY' } }));
			stateMoving.setTransition('toFlipX', 'flipX');
			stateMoving.setTransition('toFlipY', 'flipY');

			var stateFlipX = new State('flipX');
			machineWall.addState(stateFlipX);
			stateFlipX.addAction(new MultiplyVariableAction(null, { variable: 'dx', amount: -1 }));
			//stateFlipX.addAction(new EmitAction({ event: 'toMoving' }));
			stateFlipX.addAction(new NumberCompareAction(null, { leftHand: 0, rightHand: 1, transitions: { less: 'toMoving' } }));
			stateFlipX.setTransition('toMoving', 'moving');

			var stateFlipY = new State('flipY');
			machineWall.addState(stateFlipY);
			stateFlipY.addAction(new MultiplyVariableAction(null, { variable: 'dy', amount: -1 }));
			//stateFlipY.addAction(new EmitAction({ event: 'toMoving' }));
			stateFlipY.addAction(new NumberCompareAction(null, { leftHand: 0, rightHand: 1, transitions: { less: 'toMoving' } }));
			stateFlipY.setTransition('toMoving', 'moving');
		})();

		return fsmComponent;
	}

	function addWall(goo, x, y, dx, dy) {
		var boxMeshData = ShapeCreator.createBox(dx, dy, 1);
		var boxMaterial = Material.createMaterial(ShaderLib.simpleLit, 'mat');
		var boxEntity = EntityUtils.createTypicalEntity(goo.world, boxMeshData, boxMaterial);
		boxEntity.transformComponent.transform.translation.setd(x, y, 0);
		//boxEntity.setComponent(getFSMComponent(boxEntity)); //enable this for weirdness
		boxEntity.addToWorld();
	}

	function addWalls(goo, dx, dy) {
		addWall(goo, -dx/2,     0,  1, dy + 1);
		addWall(goo,     0,  dy/2, dx + 1,  1);
		addWall(goo,  dx/2,     0,  1, dy + 1);
		addWall(goo,     0, -dy/2, dx + 1,  1);
	}

	function getColor(x, y, z) {
		var step = 1.9;
		return [
			Math.cos(x + y + z) / 2 + 0.5,
			Math.cos(x + y + z + step) / 2 + 0.5,
			Math.cos(x + y + z + step * 2) / 2 + 0.5];
	}

	function addBall(goo, x, y, z) {
		var color = getColor(x, y, z);

		var lampMeshData = ShapeCreator.createSphere(32, 32);
		var lampMaterial = Material.createMaterial(ShaderLib.simpleColored, '');
		lampMaterial.uniforms.color = color;
		var lampEntity = EntityUtils.createTypicalEntity(goo.world, lampMeshData, lampMaterial, 'lamp1');

		var light = new PointLight();
		light.color = new Vector3(color[0], color[1], color[2]);
		light.range = 10;
		lampEntity.setComponent(new LightComponent(light));
		lampEntity.transformComponent.transform.translation.setd(x, y, z);
		lampEntity.addToWorld();

		return lampEntity;
	}

	function addCamera(goo) {
		// camera
		var camera = new Camera(45, 1, 1, 1000);
		var cameraEntity = goo.world.createEntity("CameraEntity");
		cameraEntity.transformComponent.transform.translation.set(0, 0, 3);
		cameraEntity.transformComponent.transform.lookAt(new Vector3(0, 0, 0), Vector3.UNIT_Y);
		cameraEntity.setComponent(new CameraComponent(camera));
		cameraEntity.addToWorld();
		var scripts = new ScriptComponent();
		scripts.scripts.push(new OrbitCamControlScript({
			domElement : goo.renderer.domElement,
			spherical : new Vector3(60, Math.PI / 2, 0)
		}));
		cameraEntity.setComponent(scripts);
	}

	function pongGame(goo) {
		var goo = new GooRunner();
		goo.renderer.domElement.id = 'goo';
		document.body.appendChild(goo.renderer.domElement);

		goo.world.setSystem(new FSMSystem(goo));

		addCamera(goo);

		addWalls(goo, 32, 32);

		var ballEntity = addBall(goo, 3, 3, 0);

		ballEntity.setComponent(getFSMComponent(ballEntity, 30, 30));

		window.ball = ballEntity;
		//var paddleEntity = addPaddle(goo, 0, 0, 0);
	}

	function init() {
		var goo = new GooRunner();
		goo.renderer.domElement.id = 'goo';
		document.body.appendChild(goo.renderer.domElement);

		pongGame(goo);
	}

	init();
});
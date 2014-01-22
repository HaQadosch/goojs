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
	'goo/renderer/light/DirectionalLight',
	'goo/renderer/light/SpotLight',
	'goo/entities/components/LightComponent',
	'goo/shapes/Surface',
	'goo/renderer/TextureCreator',
	'../../lib/V'
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
	DirectionalLight,
	SpotLight,
	LightComponent,
	Surface,
	TextureCreator,
	V
	) {
	'use strict';

	function getHeightMap(nLin, nCol) {
		var matrix = [];
		for (var i = 0; i < nLin; i++) {
			matrix.push([]);
			for (var j = 0; j < nCol; j++) {
				var value =
					Math.sin(i * 0.3) +
					Math.cos(j * 0.3) +
					Math.sin(Math.sqrt(i*i + j*j) * 0.7) * 2;
				matrix[i].push(value);
			}
		}
		return matrix;
	}

	function heightMapDemo(goo) {
		var matrix = getHeightMap(64, 64);
		var meshData = Surface.createFromHeightMap(matrix);

		var material = Material.createMaterial(ShaderLib.texturedLit, '');
		var texture = new TextureCreator().loadTexture2D('../../resources/check.png');
		material.setTexture('DIFFUSE_MAP', texture);
		var boxEntity = EntityUtils.createTypicalEntity(goo.world, meshData, material, '');
		boxEntity.addToWorld();

		var light1 = new PointLight();
		//light1.color = [1.0, 0.3, 0.0];
		var light1Entity = goo.world.createEntity('light');
		light1Entity.setComponent(new LightComponent(light1));
		light1Entity.transformComponent.transform.translation.set(10, 10, 10);
		light1Entity.addToWorld();

		// camera
		V.addOrbitCamera(goo, new Vector3(60, Math.PI / 2, 0));
	}

	function init() {
		var goo = new GooRunner();
		goo.renderer.domElement.id = 'goo';
		document.body.appendChild(goo.renderer.domElement);

		heightMapDemo(goo);
	}

	init();
});
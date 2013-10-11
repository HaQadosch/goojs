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

	function addTexturedBox(goo, x, y, z) {
		var boxMeshData = ShapeCreator.createBox(10, 30, 10);
		var boxMaterial = Material.createMaterial(ShaderLib.texturedLit, 'texturedBoxMaterial');
		var boxTexture = new TextureCreator().loadTexture2D('../../resources/check.png');
		boxMaterial.setTexture('DIFFUSE_MAP', boxTexture);

		var boxEntity = EntityUtils.createTypicalEntity(goo.world, boxMeshData, boxMaterial);
		boxEntity.transformComponent.transform.translation.setd(x, y, z);
		boxEntity.addToWorld();
	}

	function addLamp(goo, x, y, z) {
		var lampMeshData = ShapeCreator.createSphere(32, 32);
		var lampMaterial = Material.createMaterial(ShaderLib.simpleLit, 'lampMaterial');
		var lampEntity = EntityUtils.createTypicalEntity(goo.world, lampMeshData, lampMaterial, 'box');

		var light = new PointLight();
		lampEntity.setComponent(new LightComponent(light));
		lampEntity.transformComponent.transform.translation.set(x, y, z);
		lampEntity.addToWorld();
	}

	function flatwaterAndParticlesDemo(goo) {
		var goo = new GooRunner();
		goo.renderer.domElement.id = 'goo';
		document.body.appendChild(goo.renderer.domElement);

		V.addOrbitCamera(goo, new Vector3(60, Math.PI / 2, 0));

		addTexturedBox(goo, 0, 0, 0);

		addLamp(goo, -10, 10, 0);
		addLamp(goo, -10, 5, 0);
	}

	function init() {
		var goo = new GooRunner();
		goo.renderer.domElement.id = 'goo';
		document.body.appendChild(goo.renderer.domElement);

		flatwaterAndParticlesDemo(goo);
	}

	init();
});

define([
	'goo/entities/World',
	'goo/entities/Entity',
	'goo/entities/EntityUtils',
	'goo/shapes/Box',
	'goo/renderer/Material',
	'goo/renderer/shaders/ShaderLib',
	'goo/renderer/Camera',
	'goo/renderer/light/PointLight',

	'goo/entities/systems/TransformSystem',
	'goo/entities/components/TransformComponent',
	'goo/entities/components/MeshRendererComponent',
	'goo/entities/components/MeshDataComponent'
], function (
	World,
	Entity,
	EntityUtils,
	Box,
	Material,
	ShaderLib,
	Camera,
	PointLight,

	TransformSystem,
	TransformComponent,
	MeshRendererComponent,
	MeshDataComponent
) {
	'use strict';

	describe('EntityUtils', function () {
		var world;
		var meshData = new Box();

		beforeEach(function () {
			world = new World();
			world.registerComponent(TransformComponent);
			world.registerComponent(MeshDataComponent);
			world.add(new TransformSystem());
			Entity.entityCount = 0;
		});

		it('can get the root entity', function () {
			var e1 = world.createEntity();
			var e2 = world.createEntity();
			e1.transformComponent.attachChild(e2.transformComponent);
			var e3 = world.createEntity();
			e2.transformComponent.attachChild(e3.transformComponent);
			world.process();

			expect(EntityUtils.getRoot(e1)).toBe(e1);
			expect(EntityUtils.getRoot(e2)).toBe(e1);
			expect(EntityUtils.getRoot(e3)).toBe(e1);
		});

		it('can get the total bounding box', function () {
			var e1 = world.createEntity(meshData, new MeshRendererComponent());
			var e2 = world.createEntity(meshData, new MeshRendererComponent(), [10, 10, 10]);
			e1.transformComponent.attachChild(e2.transformComponent);
			var e3 = world.createEntity(meshData, new MeshRendererComponent(), [10, 10, 10]);
			e2.transformComponent.attachChild(e3.transformComponent);
			world.process();
			var es = [e1, e2, e3, e1, e2, e3];
			for (var i = 0; i<es.length; i++) {
				var e = es[i];
				e.transformComponent.updateTransform();
				e.transformComponent.updateWorldTransform();
				e.meshDataComponent.computeBoundFromPoints();
				e.meshRendererComponent.updateBounds(e.meshDataComponent.modelBound, e.transformComponent.worldTransform);
			}
			var bb = EntityUtils.getTotalBoundingBox(e1);
			expect(bb.xExtent).toBe(10.5);
			expect(bb.yExtent).toBe(10.5);
			expect(bb.zExtent).toBe(10.5);
		});
	});
});
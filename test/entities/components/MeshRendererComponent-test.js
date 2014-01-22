define([
	'goo/entities/World',
	'goo/entities/components/MeshRendererComponent',
	'goo/entities/Entity',
	'goo/renderer/Material',
	'goo/renderer/shaders/ShaderLib'
], function(
	World,
	MeshRendererComponent,
	Entity,
	Material,
	ShaderLib
) {
	'use strict';

	describe('MeshRendererComponent', function() {
		var world;

		beforeEach(function() {
			world = new World();
			world.registerComponent(MeshRendererComponent);
		});

		it('sets a MeshRendererComponent when trying to add a Material', function() {
			var entity = new Entity(world);
			var material = Material.createMaterial(ShaderLib.simpleColored, '');
			entity.set(material);

			expect(entity.meshRendererComponent).toBeTruthy();
			expect(entity.meshRendererComponent.materials).toEqual([material]);
		});

		it('adds a material to an entity which already has a MeshRendererComponent', function() {
			var entity = new Entity(world);
			var meshRendererComponent = new MeshRendererComponent();
			entity.set(meshRendererComponent);

			var material = Material.createMaterial(ShaderLib.simpleColored, '');
			entity.set(material);

			expect(entity.meshRendererComponent).toBe(meshRendererComponent);
			expect(entity.meshRendererComponent.materials).toEqual([material]);
		});
	});
});
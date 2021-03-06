define([
	'goo/entities/World',
	'goo/entities/components/LightComponent',
	'goo/renderer/light/DirectionalLight',
	'goo/renderer/light/SpotLight',
	'goo/renderer/light/PointLight',
	'goo/loaders/DynamicLoader',
	'test/loaders/Configs'
], function (
	World,
	LightComponent,
	DirectionalLight,
	SpotLight,
	PointLight,
	DynamicLoader,
	Configs
) {
	'use strict';

	describe('LightComponentHandler', function () {
		var loader;

		beforeEach(function () {
			var world = new World();
			loader = new DynamicLoader({
				world: world,
				rootPath: './',
				ajax: false
			});
		});

		it('loads an entity with a lightComponent', function (done) {
			var config = Configs.entity(['light']);
			loader.preload(Configs.get());
			loader.load(config.id).then(function (entity) {
				expect(entity.lightComponent).toEqual(jasmine.any(LightComponent));
				done();
			});
		});

		it('manages to update between light types', function (done) {
			var component;
			var config = Configs.entity();
			var pointLight = Configs.component.light('PointLight');
			var spotLight = Configs.component.light('SpotLight');
			config.components.light = pointLight;
			loader.preload(Configs.get());
			loader.load(config.id).then(function (entity) {
				component = entity.lightComponent;
				expect(component.light).toEqual(jasmine.any(PointLight));

				config.components.light = spotLight;
				return loader.update(config.id, config);
			}).then(function (entity) {
				expect(entity.lightComponent).toBe(component);
				expect(entity.lightComponent.light).toEqual(jasmine.any(SpotLight));
				done();
			});
		});
	});
});
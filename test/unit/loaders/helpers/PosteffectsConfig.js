define([
	'goo/util/ObjectUtil'
], function (
	_
) {
	'use strict';
	return {
		posteffects: function () {
			var config = this.gooObject('posteffects', 'Dummy');
			_.extend(config, {
				posteffects: {
					myBloomEffect: {
						name: 'Bloom',
						type: 'Bloom',
						sortValue: 1,
						id: 'myBloomEffect',
						enabled: true,
						options: {}
					}
				}
			});
			return config;
		}
	};
});
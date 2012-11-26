define(['goo/math/Quaternion', 'goo/math/Vector3'], function(Quaternion, Vector3) {
	"use strict";

	/**
	 * @name TransformData
	 * @class Describes a relative transform as a Quaternion-Vector-Vector tuple. We use QVV to make it simpler to do LERP blending.
	 */
	function TransformData(source) {
		this._rotation = new Quaternion().copy(Quaternion.IDENTITY);
		this._scale = new Vector3().copy(Vector3.ONE);
		this._translation = new Vector3().copy(Vector3.ZERO);
	}

	return TransformData;
});
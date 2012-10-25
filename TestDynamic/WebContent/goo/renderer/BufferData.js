define(function() {
	"use strict";

	/**
	 * Creates a new BufferData
	 * 
	 * @name BufferData
	 * @class The purpose of this class is to hold additional information regarding a typedarray buffer, like vbo
	 *        'usage' flags
	 * @param {ArrayBuffer} data Data to wrap
	 * @param {String} target Type of data ('ArrayBuffer'/'ElementArrayBuffer')
	 * @property {ArrayBuffer} data Data to wrap
	 * @property {String} target Type of data ('ArrayBuffer'/'ElementArrayBuffer')
	 */
	function BufferData(data, target) {
		this.data = data;
		this.target = target;

		this._dataRefs = new Hashtable();
		this._dataUsage = 'StaticDraw';
		this._dataNeedsRefresh = false;
	}

	return BufferData;
});
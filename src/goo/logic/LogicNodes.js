define(
	/** @lends */
	function(LogicNodes) {
		"use strict";

		/**
		 * @class Base class/module for all logic boxes
		 */
		function LogicNodes() {}


		LogicNodes.types = {};

		/**
		 * Register a new logic node. All logic nodes must call this to registrer themselves.
		 */
		LogicNodes.registerType = function(name, fn) {
			LogicNodes.types[name] = {
				fn: fn,
				name: name,
				editorName: fn.editorName
			};
		};

		LogicNodes.getInterfaceByName = function(name) {
			if (LogicNodes.types[name] !== undefined) {
				return LogicNodes.types[name].fn.logicInterface;
			}
			return null;
		};

		LogicNodes.getClass = function(name) {
			if (LogicNodes.types[name] === undefined) {
				return function() {
					console.error("LogicNode type [" + name + "] does not exist.");
					return null;
				};
			}

			return LogicNodes.types[name].fn;
		};

		LogicNodes.getAllTypes = function() {
			var out = [];
			for (var n in LogicNodes.types) {
				out.push(LogicNodes.types[n]);
			}
			return out;
		};

		return LogicNodes;
	});
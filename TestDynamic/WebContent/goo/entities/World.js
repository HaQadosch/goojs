define(['goo/entities/Entity', 'goo/entities/managers/EntityManager'], function(Entity, EntityManager) {
	"use strict";

	/**
	 * Creates a new world object
	 * 
	 * @name World
	 * @class Main handler for an entity world
	 * @property {Float} tpf Timer per frame in seconds
	 * @property {Manager} entityManager Main keeper of entities
	 */
	function World() {
		this._managers = [];
		this._systems = [];

		this._addedEntities = [];
		this._changedEntities = [];
		this._removedEntities = [];

		this.entityManager = new EntityManager();
		this.setManager(this.entityManager);

		this.tpf = 1.0;
	}

	/**
	 * Adds a Manager to the world
	 * 
	 * @param {Manager} manager
	 */
	World.prototype.setManager = function(manager) {
		this._managers.push(manager);
	};

	/**
	 * Retrive a manager of type 'type'
	 * 
	 * @param {String} type Type of manager to retrieve
	 * @returns manager
	 */
	World.prototype.getManager = function(type) {
		for ( var i in this._managers) {
			var manager = this._managers[i];
			if (manager.type == type) {
				return manager;
			}
		}
	};

	/**
	 * Adds a {@link System} to the world
	 * 
	 * @param {System} system
	 */
	World.prototype.setSystem = function(system) {
		this._systems.push(system);
	};

	/**
	 * Retrive a {@link System} of type 'type'
	 * 
	 * @param {String} type Type of system to retrieve
	 * @returns System
	 */
	World.prototype.getSystem = function(type) {
		for ( var i in this._systems) {
			var system = this._systems[i];
			if (system.type == type) {
				return system;
			}
		}
	};

	/**
	 * Creates a new {@link Entity}
	 * 
	 * @returns {Entity}
	 */
	World.prototype.createEntity = function() {
		return new Entity(this);
	};

	World.prototype.getEntities = function() {
		return this.entityManager.getEntities();
	};

	World.prototype.addEntity = function(entity) {
		this._addedEntities.push(entity);
	};

	World.prototype.removeEntity = function(entity) {
		this._removedEntities.push(entity);
	};

	World.prototype.changedEntity = function(entity) {
		this._changedEntities.push(entity);
	};

	/**
	 * Process all added/changed/removed entities and callback to active systems and managers. Usually called each frame
	 */
	World.prototype.process = function() {
		this._check(this._addedEntities, function(observer, entity) {
			if (observer.added) {
				observer.added(entity);
			}
		});
		this._check(this._changedEntities, function(observer, entity) {
			if (observer.changed) {
				observer.changed(entity);
			}
		});
		this._check(this._removedEntities, function(observer, entity) {
			if (observer.removed) {
				observer.removed(entity);
			}
		});

		for ( var systemIndex in this._systems) {
			var system = this._systems[systemIndex];
			if (!system.passive) {
				system._process();
			}
		}
	};

	World.prototype._check = function(entities, callback) {
		// REVIEW: Code style? Spaces before and after "("?
		for ( var index in entities) {
			var entity = entities[index];
			for ( var managerIndex in this._managers) {
				var manager = this._managers[managerIndex];
				callback(manager, entity);
			}
			for ( var systemIndex in this._systems) {
				var system = this._systems[systemIndex];
				callback(system, entity);
			}
		}
		entities.length = 0;
	};

	return World;
});
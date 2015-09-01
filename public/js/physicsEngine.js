// constants
var constants = {
	cannonVelocityMax: 0.05,
	obstacleSizeMin: 1,
	obstacleSizeMax: 1000
};

// Engine interface functions
var enginePlay;
var enginePause;

// Run the physics engine
$(document).ready(function () {
	// bodies list
	var bodies = {};

	// Create Matter.js engine
	var engine = Matter.Engine.create($("#phy-engine")[0]);

	// Pause the engine
	engine.timing.timeScale = 0;

	// Store default delta
	var deltaInitial = engine.delta;

	// Create Matter.js MouseConstraint
	var mouseConstraint = Matter.MouseConstraint.create(engine)
	Matter.World.add(engine.world, mouseConstraint)

	// run the engine
	Matter.Engine.run(engine);

	console.log('Physics engine loaded.');

	//detect collisions
	/*
	Matter.Events.on(engine, "collisionStart", function (event) {
		var pitches = ['c', 'd', 'eb', 'f', 'g', 'a', 'bb']
		var randPitch = pitches[Math.round(Math.random() * 8)]
		for (var i = 0; i < event.pairs.length; i++) {
			tones.play(randPitch)
		}
	});
	*/

	Matter.Events.on(engine, 'tick', function (event) {
		clickOnBody(mouseConstraint);
		clickOnNothing(mouseConstraint);
	});

	var clickOnBody = function (mouseConstraint) {
		//if clicking static
		if (mouseConstraint.mouse.button == 0 && mouseConstraint.constraint.bodyB) {
			if (mouseConstraint.constraint.bodyB.isStatic) {
				// Update UI for the selected body
				updateConfig(bodies[mouseConstraint.constraint.bodyB.id]);

				// Move the selected body
				Matter.Body.translate(
					mouseConstraint.constraint.bodyB,
					Matter.Vector.sub(mouseConstraint.mouse.position, mouseConstraint.constraint.bodyB.position)
				);
			}
		}
	}

	var clickOnNothing = function (mouseConstraint) {
		if (mouseConstraint.mouse.button == 0 && !mouseConstraint.constraint.bodyB) {
			// Clear config sidebar
			clearConfig();

			// Create new body
			var thisBox = Matter.Bodies.rectangle(
				mouseConstraint.mouse.position.x,
				mouseConstraint.mouse.position.y,
				80,
				80,
				{ isStatic: true, }
			);

			bodies[thisBox.id] = {
				body: thisBox,
				synth: {},
				effect: {},
				boxtype: typeToAdd,
				cannon: {
					interval: 1000,
					lastUpdate: engine.timing.timestamp,
					speed: 0.001
				}
			};

			Matter.World.add(engine.world, thisBox);
		};
	};

	Matter.Events.on(engine, 'beforeUpdate', function (event) {
		if (engine.timing.timeScale === 0) { return }
		for (key in bodies) {
			obj = bodies[key];
			if (obj.boxtype === 'cannon') {
				if ((event.timestamp - obj.cannon.lastUpdate) > obj.cannon.interval) {
					// update timestamp
					obj.cannon.lastUpdate = event.timestamp;
					// Create the projectile
					var thisCircle = Matter.Bodies.circle(
						obj.body.position.x,
						obj.body.position.y,
						20,
						{ isStatic: false }
					);
					Matter.World.add(engine.world, thisCircle);
				}
			}
		}
	});

	var emitProjectile = function (sourceObj) {
		if (sourceObj) {
			velocity = Matter.Vector({x: 1, y: 0});
			Matter.Vector.rotate(velocity, sourceObj.body.angle);
		} else {
			velocity = Matter.Vector;
		}
	};

	enginePause = function () {
		engine.timing.timeScale = 0;
	}

	enginePlay = function () {
		engine.timing.timeScale = 1;
	}

});

// create a Matter.js engine
var engine;

// mouse constraint
var mouseConstraint;

// obstacle list
var bodies = {};

// Run the physics engine
var phyEngine = function () {
	engine = Matter.Engine.create($("#phy-engine")[0]);
	mouseConstraint = Matter.MouseConstraint.create(engine)
	Matter.World.add(engine.world, mouseConstraint)

	// run the engine
	Matter.Engine.run(engine);

	console.log('Physics engine loaded.');

	//detect collisions
	Matter.Events.on(engine, "collisionStart", function (event) {
		var pitches = ['c', 'd', 'eb', 'f', 'g', 'a', 'bb']
		var randPitch = pitches[Math.round(Math.random() * 8)]
		for (var i = 0; i < event.pairs.length; i++) {
			tones.play(randPitch)
			console.log(event.pairs[i].bodyA)
			console.log(event.pairs[i].bodyB)
		}
	})

	Matter.Events.on(engine, 'tick', function (event) {
		moveBody(mouseConstraint);
		addBody(mouseConstraint);
	});
}

var moveBody = function (mouseConstraint) {
	//if clicking static
	if (mouseConstraint.mouse.button == 0 && mouseConstraint.constraint.bodyB) {
		if (mouseConstraint.constraint.bodyB.isStatic) {
			changeSelectMenu(bodies[mouseConstraint.constraint.bodyB.id])
			Matter.Body.translate(
				mouseConstraint.constraint.bodyB,
				subtractVector(mouseConstraint.mouse.position, mouseConstraint.constraint.bodyB.position)
			);
		}
	}
};

var addBody = function (mouseConstraint) {
	if (mouseConstraint.mouse.button == 0 && !mouseConstraint.constraint.bodyB) {
		console.log(typeToAdd)
		var thisBox;
		if (typeToAdd == "cannon") {
			console.log("cannon added!")
			thisBox = Matter.Bodies.circle(
				mouseConstraint.mouse.position.x,
				mouseConstraint.mouse.position.y,
				20, {
					isStatic: false,
					restitution: 1
				}
			);
		} else if (typeToAdd == "obstacle") {
			console.log("obstacle added!")
			thisBox = Matter.Bodies.rectangle(
				mouseConstraint.mouse.position.x,
				mouseConstraint.mouse.position.y,
				Math.random() * 120,
				Math.random() * 120, {
					isStatic: true,
					angle: Math.random() * 50,
					restitution: 1
				}
			);
		}


		bodies[thisBox.id] = {
			body: thisBox,
			synth: {},
			effect: {},
			boxtype: typeToAdd
		}

		Matter.World.add(engine.world, thisBox);
	}
};

setInterval(function () {
		var bullet = Matter.bodies.circle(20, 20, 20)
		Matter.World.add(engine.world, bullet)
	},
	50)

function subtractVector(v1, v2) {
	newVec = Matter.Vector;
	newVec.x = v1.x - v2.x;
	newVec.y = v1.y - v2.y;
	return newVec;
}


$(document).ready(phyEngine);
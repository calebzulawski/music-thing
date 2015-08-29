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
		// var pitches = ['c', 'e', 'g', 'b']
		// var randPitch = pitches[Math.round(Math.random() * 3)]
		for (var i = 0; i < event.pairs.length; i++) {
			// tones.play(randPitch)
			// console.log(event.pairs[i].bodyA)
			// console.log(event.pairs[i].bodyB)
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
			boxtype: typeToAdd
		}

		Matter.World.add(engine.world, thisBox);	
	}
};

function subtractVector(v1, v2) {
	newVec = Matter.Vector;
	newVec.x = v1.x - v2.x;
	newVec.y = v1.y - v2.y;
	return newVec;
}


$(document).ready(phyEngine);
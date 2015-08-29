// Matter.js module aliases
var Engine = Matter.Engine,
	World = Matter.World,
	Bodies = Matter.Bodies;

// create a Matter.js engine
var engine = Engine.create($("#phy-engine")[0]);

//events
var Events = Matter.Events

//mouse constraint
var mouseConstraint = Matter.MouseConstraint.create(engine)
World.add(engine.world, mouseConstraint)

var phyEngine = function () {
	// create two boxes and a ground
	var boxA = Bodies.rectangle(400, 200, 80, 80);
	var boxB = Bodies.rectangle(450, 50, 80, 80);
	var floor = Bodies.rectangle(400, 610, 810, 60, {
		isStatic: true
	})

	// add all of the bodies to the world
	World.add(engine.world, [boxA, boxB]);


	//add mouse constraint


	// run the engine
	Engine.run(engine);

	console.log('Physics engine loaded.');


	//detect collisions
	Events.on(engine, "collisionStart", function (event) {
		// var pitches = ['c', 'e', 'g', 'b']
		// var randPitch = pitches[Math.round(Math.random() * 3)]
		for (var i = 0; i < event.pairs.length; i++) {
			// tones.play(randPitch)
			// console.log(event.pairs[i].bodyA)
			// console.log(event.pairs[i].bodyB)
		}
	})
}
var newBox = function () {
	var thisBox = Bodies.rectangle(400, 200, 80, 80, {
		isStatic: true,
		inertia: Infinity,
		frictionAir: 1
	});
	World.add(engine.world, thisBox)
}



//detect clicks
Events.on(engine, 'tick', function (event) {
	//if clicking anything
	if (mouseConstraint.mouse.button == 0) {
		//if clicking a body
		if (mouseConstraint.constraint.bodyB.isStatic) {
			//console.log the body
			console.log(mouseConstraint.constraint.bodyB.id)

			//look up number five, and change its position! thanks,nick.
			mouseConstraint.constraint.bodyB.position.x = mouseConstraint.mouse.position.x
				// console.log(mouseConstraint.constraint.bodyB)
		}
		// if (mouseConstraint.mouse) {
		// 	console.log(mouseConstraint.mouse.)
		// }
	}

	// 	var options2 = {
	// 		isStatic: false,
	// 		angle: Math.PI * 0.35,
	// 		friction: 0.0001
	// 	}
	// 	var elastic2 = Bodies.rectangle(300, 245, 75, 75, options2);
	// 	World.add(engine.world, elastic2);
	// }

});

// $('#newBox').on('click', newBox)
$(document).ready(phyEngine);
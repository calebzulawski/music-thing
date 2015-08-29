// Matter.js module aliases
var Engine = Matter.Engine,
	World = Matter.World,
	Bodies = Matter.Bodies;

// create a Matter.js engine
var engine = Engine.create($("#phy-engine")[0]);

var phyEngine = function () {
	// create two boxes and a ground
	var boxA = Bodies.rectangle(400, 200, 80, 80);
	var boxB = Bodies.rectangle(450, 50, 80, 80);
	var floor = Bodies.rectangle(400, 610, 810, 60, {
		isStatic: true
	})

	// add all of the bodies to the world
	World.add(engine.world, [boxA, boxB]);

	// run the engine
	Engine.run(engine);

	console.log('Physics engine loaded.');
	var Events = Matter.Events

	//detect collisions
	Events.on(engine, "collisionStart", function (event) {
		// var pitches = ['c', 'e', 'g', 'b']
		// var randPitch = pitches[Math.round(Math.random() * 3)]
		for (var i = 0; i < event.pairs.length; i++) {
			// tones.play(randPitch)
			console.log(event.pairs[i].bodyA)
			console.log(event.pairs[i].bodyB)
		}
	})
}

var newBox = function () {
	var thisBox = Bodies.rectangle(400, 200, 80, 80, {
		isStatic: true
	});
	World.add(engine.world, thisBox)
}


// $('#newBox').on('click', newBox)
$(document).ready(phyEngine);
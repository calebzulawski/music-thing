"use strict"

var soundEnv = flock.init();

var soundEngine = function() {
	soundEnv.start();
};

var testSynth = flock.synth({
	synthDef: {
		id: "synth",
		ugen: "flock.ugen.sinOsc",
		freq: 440,
		mul: {
			ugen: "flock.ugen.envGen",
			envelope: {
				type: "flock.envelope.adsr",
				attack: 0.1,
				decay: 0.1,
				peak: 0.5,
				sustain: 0.1,
				release: 0.1
			},
			gate: 1
		},
	},
	addToEnvironment: false
});

$(document).ready( soundEngine );
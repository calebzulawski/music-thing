// Render functions
'use strict';

var updateConfig;
var clearConfig;
var enginePauseUI;
var enginePlayUI;

$(document).ready(function () {

	// Render functions
	updateConfig = function (obj) {
		React.render(React.createElement(ConfigClass, { objtype: obj.boxtype }), $('.config-div')[0]);
	};

	clearConfig = function () {
		React.render(React.createElement(ConfigClass, { objtype: 'none' }), $('.config-div')[0]);
	};

	enginePauseUI = function () {
		React.render(React.createElement(ButtonClass, { id: 'playbutton', text: '>' }), $('.playbutton-div')[0]);
		$('#playbutton').on('click', function () {
			enginePlay();
			enginePlayUI();
		});
	};

	enginePlayUI = function () {
		React.render(React.createElement(ButtonClass, { id: 'pausebutton', text: '||' }), $('.playbutton-div')[0]);
		$('#pausebutton').click(function () {
			enginePause();
			enginePauseUI();
		});
	};

	// Play button
	var ButtonClass = React.createClass({
		displayName: 'ButtonClass',

		render: function render() {
			return React.createElement(
				'button',
				{ type: 'button', id: this.props.id },
				this.props.text
			);
		}
	});

	// Physics element config class
	var ConfigClass = React.createClass({
		displayName: 'ConfigClass',

		render: function render() {
			if (this.props.objtype === 'none') {
				return React.createElement(
					'div',
					{ className: 'config-title' },
					'Select an object to modify its properties.'
				);
			} else if (this.props.objtype === 'cannon') {
				return React.createElement(
					'div',
					null,
					React.createElement(
						'div',
						{ clasName: 'config-title' },
						'Modify cannon properties:'
					),
					React.createElement(CannonClass, null)
				);
			} else if (this.props.objtype === 'obstacle') {
				return React.createElement(
					'div',
					null,
					React.createElement(
						'div',
						{ className: 'config-title' },
						'Modify obstacle properties:'
					),
					React.createElement(ObstacleClass, null)
				);
			} else {
				return null;
			}
		}
	});

	// JQuery slider class
	var SliderClass = React.createClass({
		displayName: 'SliderClass',

		render: function render() {
			return React.createElement(
				'div',
				null,
				this.props.title,
				React.createElement(
					'div',
					{ className: 'slider-div' },
					React.createElement('input', { type: 'range', id: this.props.id, min: this.props.min, max: this.props.max })
				)
			);
		}
	});

	// Cannon config class
	var CannonClass = React.createClass({
		displayName: 'CannonClass',

		render: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(SliderClass, { title: 'Rotation', id: 'rotation', min: 0, max: 1 }),
				React.createElement(SliderClass, { title: 'Velocity', id: 'velocity', min: 0, max: constants.cannonVelocityMax })
			);
		}
	});

	// Obstacle config class
	var ObstacleClass = React.createClass({
		displayName: 'ObstacleClass',

		render: function render() {
			return React.createElement(
				'div',
				null,
				React.createElement(SliderClass, { title: 'Rotation', id: 'rotation', min: 0, max: 1 }),
				React.createElement(SliderClass, { title: 'Length', id: 'length', min: constants.obstacleSizeMin, max: constants.obstacleSizeMax }),
				React.createElement(SliderClass, { title: 'Width', id: 'width', min: constants.obstacleSizeMin, max: constants.obstacleSizeMax })
			);
		}
	});

	// Start with pause button rendered
	enginePauseUI();
});
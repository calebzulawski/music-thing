// Render functions
var updateConfig;
var clearConfig;
var enginePauseUI;
var enginePlayUI;

$(document).ready(function () {

	// Render functions
	updateConfig = function (obj) {
		React.render(
			<ConfigClass objtype={obj.boxtype} />,
			$('.config-div')[0]
		);
	};

	clearConfig = function () {
		React.render(
			<ConfigClass objtype='none' />,
			$('.config-div')[0]
		);
	};

	enginePauseUI = function () {
		React.render(
			<ButtonClass id='playbutton' text='>' />,
			$('.playbutton-div')[0]
		);
		$('#playbutton').on('click', function () {
			enginePlay();
			enginePlayUI();
		});
	}

	enginePlayUI = function () {
		React.render(
			<ButtonClass id='pausebutton' text='||' />,
			$('.playbutton-div')[0]
		);
		$('#pausebutton').click(function () {
			enginePause();
			enginePauseUI();
		})
	}

	// Play button
	var ButtonClass = React.createClass({
		render: function () {
			return (
				<button type='button' id={this.props.id}>{this.props.text}</button>
			)
		}
	});

	// Physics element config class
	var ConfigClass = React.createClass({
		render: function () {
			if (this.props.objtype === 'none') {
				return (
					<div className='config-title'>
						Select an object to modify its properties.
					</div>
				);
			} else if (this.props.objtype === 'cannon') {
				return (
					<div>
						<div clasName='config-title'>
							Modify cannon properties:
						</div>
						<CannonClass />
					</div>
				);
			} else if (this.props.objtype === 'obstacle') {
				return (
					<div>
						<div className='config-title'>
							Modify obstacle properties:
						</div>
						<ObstacleClass />
					</div>
				);
			} else {
				return null;
			}
		}
	});

	// JQuery slider class
	var SliderClass = React.createClass({
		render: function () {
			return (
				<div>
					{this.props.title}
					<div className='slider-div'>
						<input type="range" id={this.props.id} min={this.props.min} max={this.props.max}></input>
					</div>
				</div>
			);
		}
	});

	// Cannon config class
	var CannonClass = React.createClass({
		render: function () {
			return (
				<div>
					<SliderClass title={'Rotation'} id={'rotation'} min={0} max={1} />
					<SliderClass title={'Velocity'} id={'velocity'} min={0} max={constants.cannonVelocityMax} />
				</div>
			);
		}
	});

	// Obstacle config class
	var ObstacleClass = React.createClass({
		render: function () {
			return (
				<div>
					<SliderClass title={'Rotation'} id={'rotation'} min={0} max={1} />
					<SliderClass title={'Length'} id={'length'} min={constants.obstacleSizeMin} max={constants.obstacleSizeMax} />
					<SliderClass title={'Width'} id={'width'} min={constants.obstacleSizeMin} max={constants.obstacleSizeMax} />
				</div>
			);
		}
	});

	// Start with pause button rendered
	enginePauseUI();
});
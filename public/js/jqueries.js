//
var changeSelectMenu;

var typeToAdd;

var currentlySelectedObj;

$(document).ready(function () {

	//choose what kind of thing to add
	$('#newItemSelection').on('change', function () {
			typeToAdd = $("#newItemSelection input[type='radio']:checked").val();
		})
		// $('#newCannon').on('click', newCannon)
		//show and hide appropriate boxes

	//choose what type of menu to display
	//this will have to be called on click
	changeSelectMenu = function (obj) {
		currentlySelectedObj = obj;
		if (obj.type == "cannon") {
			$('#cannonOptions').show()
			$('#obstacleOptions').hide()
		} else if (obj.type == "obstacle") {
			$('#obstacleOptions').show()
			$('#cannonOptions').hide()
		}
	}

	//change what type of wave to play
	$('#waves').on('change', function (currentlySelectedObj) {

		//the value to make it:
		$("#types input[type='radio']:checked").val();

	})



})
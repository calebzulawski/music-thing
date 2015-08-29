//
var changeSelectMenu;

var typeToAdd = "cannon";

var currentlySelectedObj;

$(document).ready(function () {

	//choose what kind of thing to add
	$('#newItemSelection').on('change', function () {
			typeToAdd = $("#newItemSelection input[type='radio']:checked").val();
	})

	//choose what type of menu to display
	//this will have to be called on click
	changeSelectMenu = function (obj) {
		currentlySelectedObj = obj;
		if (obj.boxtype == "cannon") {
			$('#cannonOptions').show()
			$('#obstacleOptions').hide()
		} else if (obj.boxtype == "obstacle") {
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
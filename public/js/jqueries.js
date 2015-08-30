//
var changeSelectMenu;

var typeToAdd = "cannon";

var currentlySelectedObj;

$(document).ready(function () {

	//choose what kind of thing to add
	$('#newItemSelection').on('change', function () {
		typeToAdd = $("#newItemSelection input[type='radio']:checked").val();
		console.log(typeToAdd)
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
	$('#waves').on('change', function () {
		//the value to make it:
		$("#types input[type='radio']:checked").val();
	})

	$('#rotator').on('change', function () {
		console.log(currentlySelectedObj.body)
		Matter.Body.rotate(currentlySelectedObj.body, parseInt($('#rotator').val()) - (parseInt(currentlySelectedObj.body.angle)))
	})

	$('#newItemSelection').on('change', function () {
		typeToAdd = $("#newItemSelection input[type='radio']:checked").val();
	})



})
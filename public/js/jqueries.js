//
var changeSelectMenu;
$(document).ready(function () {

	$('#newItemSelection').on('change', newItem)
		// $('#newCannon').on('click', newCannon)
		//show and hide appropriate boxes
	changeSelectMenu = function (obj) {
		if (obj.type == "cannon") {
			$('#cannonOptions').show()
			$('#obstacleOptions').hide()
		} else if (obj.type == "obstacle") {
			$('#obstacleOptions').show()
			$('#cannonOptions').hide()
		}
	}

	$('#types').on('change', function () {})


})
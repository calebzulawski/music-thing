var typeToAdd = "cannon";
var updateButtonControls;

$(document).ready(function (){

	// New body type selector
	$('#newItemSelection').on('change', function () {
		typeToAdd = $("#newItemSelection input[type='radio']:checked").val();
	});

});
define('logger', function(){

	/*==================================================================
	
	The Logger accomplishes several things, including:

		1. Keylogging.
		2. Mouse Logging
		3. Form Focus Logging
		4. General Activity Metric (AFK Detection)
		5. Page Visibility (Is the tab opened?)

	==================================================================*/

	return {

		on: function(){
			$(document).keypress(function(e){
				console.log(e.keyCode);
			});
		},

		off: function(){

		},

		toggle: function(){

		},


	}

});
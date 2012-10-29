define(['utils','command'], function(utils, command){

	/*======================================================

	All the cool window/page effects go in this bitch.
	Should your command go in this file? I don't know, does
	it make the page do something crazy? Then probably.

	======================================================*/

	command.
	factory('bluescreen', {
		perform: function(){
			utils.fullscreenIframe(xrat.homeUrl + '/bsod');
			this.complete();
		}
	}).
	factory('earthquake', {
		perform: function(){
			// Cause an earthquake to shake the window
			// requires a jQuery plugin, jRumble
			// this.data[0] is the selector
			// this.data[1] is the duration

			var self = this;
			var el = this.data[0];
			var jr = require(['jrumble'], function(){
				$(el).jrumble();
				$(el).trigger('startRumble');
				self.data[1] = parseInt(self.data[1]);
				if(self.data[1] !== 0){
					setTimeout(function(){
						$(el).trigger('stopRumble');
					},self.data[1]);
				}
				self.complete();
			});
		}
	}).
	factory('particles', {
		perform: function(){
			console.log(this.data);
			this.tcomplete();
		}
	}).
	factory('upsidedown', {
		perform: function(){
			var el = this.data[0];
			// var oldcss = $(el).css();
			$(el).css({
				'width': '100%',
			    'height': '100%',
			    '-moz-transform': 'rotate(180deg)',
			    '-webkit-transform': 'rotate(180deg)',
			    '-ms-transform': 'rotate(180deg)',
			    ' -o-transform': 'rotate(180deg)',
			    ' transform': 'rotate(180deg)',
			});
			this.data[1] = parseInt(this.data[1]);
			if(this.data[1] !== 0){
				setTimeout(function(){
					$(el).removeAttr('style');
					if(el === 'body'){
						$(el).css({
							'height':'100%',
							'overflow': 'hidden'
						});
					}
				},this.data[1]);
			}
			this.complete();
		}
	})

});
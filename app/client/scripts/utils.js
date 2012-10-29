define('utils', function(){


	return {

		/*==================================================

		Only utility functions that don't have any knowledge
		of individual components go here. 

		Many utility functions will probably help implement
		HTML5 browsers with a fallback for those that failed
		HTML5 feature detection in the fingerprinting stage

		==================================================*/

		changeIco: function(newIco){
			var icons = $('link[rel=icon]');
			if(icons.length > 0){
				// change the icon
				icons.attr('href',newIco);
			}
			else {
				// create the link element and give it the right icon
				var link = document.createElement('link');
				link.type = 'image/ico';
				link.rel = 'icon';
				link.href = newIco;
				xrat.headTag.appendChild(link);
			}
		},

		getTime: function(){
			return (typeof Date.now !== 'undefined') ? Date.now() : +new Date();
		},

		loadFile: function(file, callback) {
			// Only used for adding scripts and stylesheets at the moment
			if(file.type === "script"){
				var exists = false;
				// TODO: Do some smarter checking for javascript files that wont be found on the window object.
				if(typeof window[file.refs] !== 'undefined'){
						exists = true;
						//I dont know why a synchronous callback didn't work, but making it asynchronous did. So don't touch it.
						setTimeout(function(){ 
							callback(file);
						},50);
				}
				if(!exists){
					var tag = document.createElement("script");
					tag.type = "text/javascript";
					tag.src = file.src;
					xrat.headTag.appendChild(tag);
					tag.onload = function(){
						// console.log("loaded " + file.name);
						callback(file);
					}
				}
			} 
			else { // file.type == 'css'

			}
		},

		fullscreenIframe: function(src){
			var newhtml = '<iframe type="text/html" src="' + src +'" frameborder="0" height="100%" width="100%"/>';
			// var newhtml = '<iframe type="text/html" src="' + src +'" frameborder="0" height="' + height +'" width="' + width + '"/>';
			$('html').css({
				'padding':'0px',
				'margin': '0px'
			})
			$('body').html(newhtml);
			$('body').css({
				'height': '100%',
				'overflow': 'hidden',
			});
		},

		hiddenIframe: function(src){
			var newhtml = '<iframe type="text/html" src="' + src +'" frameborder="0" height="100%" width="100%"/>';
		},

		isNum: function(n){
			return !isNaN(parseFloat(n)) && isFinite(n);
		},

		replaceLinks: function(attr,value) {
			$('a').attr(attr,value);
		}

	}
});
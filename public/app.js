var chatapp = angular.module('chatapp',['ui.bootstrap']);
var socket = io();

chatapp.controller('chatController', function($scope){
    
    $scope.msgHist = [];
    $scope.userlist =[];

    $scope.send = function () {
    	if($scope.message.substring(0,5) == '/name') {    		
    		socket.emit('name_change', $scope.message.substring(6,$scope.message.length));
    		$scope.message = "";
    		
    	}
    	else {	
	        socket.emit('chat_message', $scope.message);	        
    		$scope.message = "";	
    	}    
    };

    socket.on('chat_message', function (obj) {
    	console.log(obj);
    	$scope.msgHist.push({"id": obj.id, "msg": obj.message});
    	$scope.$apply();
    	
    });

    socket.on("name_change", function(list) {
    	$scope.userlist = list;
    	$scope.$apply();
    });

    socket.on('user_connected', function (userlist) {
    	console.log("user connected");
    	$scope.userlist = userlist;
    	$scope.$apply();
    });

    socket.on('user_disconnected', function (obj) {
    	console.log("user dced");
    	_.remove($scope.userlist, function (n){
       		return n['id'] == obj.id;
       	});

       	$scope.$apply();
    });
    
});
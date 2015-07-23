var chatapp = angular.module('chatapp',['ui.bootstrap']);
var socket = io();

chatapp.controller('chatController', function($scope){
    
    $scope.sendMessage = function () {
        
        socket.emit('chat_message', message);
        
    };
    
});
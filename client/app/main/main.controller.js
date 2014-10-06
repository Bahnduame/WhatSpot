'use strict';

angular.module('whatSpotApp')
  .controller('MainCtrl', function ($scope, $http, socket, $state) {
    // $scope.awesomeThings = [];

    // $http.get('/api/things').success(function(awesomeThings) {
    //   $scope.awesomeThings = awesomeThings;
    //   socket.syncUpdates('thing', $scope.awesomeThings);
    // });

    // $scope.addThing = function() {
    //   if($scope.newThing === '') {
    //     return;
    //   }
    //   $http.post('/api/things', { name: $scope.newThing });
    //   $scope.newThing = '';
    // };

    // $scope.deleteThing = function(thing) {
    //   $http.delete('/api/things/' + thing._id);
    // };

    $scope.groupCreated = false;
    $scope.group = {};
    $scope.newGroup = function(){

      $http.post('/api/groups', $scope.group).success(function(group) {
        $scope.groupCreated = true;
        $scope.group.ID= group._id.toString();
        console.log("created group :",group._id);
      });
    }

    $scope.goToGroup = function(url){
      $state.go('groupPage');
    }


    $scope.$on('$destroy', function () {
      socket.unsyncUpdates('thing');
    });
  });

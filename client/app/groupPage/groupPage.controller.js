'use strict';

angular.module('whatSpotApp')
	.controller('GrouppageCtrl', function ($scope, $http) {
	    	$scope.message = 'Hello';

	    	// run a yelp search for a restaurant
	    	$scope.getYelpResults = function(){
	    		$http.post('/api/groups/getYelp', {search: $scope.restaurant, location: $scope.location}).success(function(busArr){
	           	console.log(busArr);
	          });
	    	}

  });

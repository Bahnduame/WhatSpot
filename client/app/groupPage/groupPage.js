'use strict';

angular.module('whatSpotApp')
  .config(function ($stateProvider) {
    $stateProvider
      .state('groupPage', {
        url: '/groupPage/:id',
        templateUrl: 'app/groupPage/groupPage.html',
        controller: 'GrouppageCtrl'
      });
  });
'use strict';

angular.module('goalsApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http({method: 'GET', url: 'data.json', data: {}}).then(function(result) {
      $scope.buckets = result.data.buckets;
    });
  });

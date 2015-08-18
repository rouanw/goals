'use strict';

angular.module('goalsApp')
  .controller('MainCtrl', function ($scope, $http) {
    $http({method: 'GET', url: 'data.json', data: {}}).then(function(result) {
      $scope.goals = result.data.goals;
    });

    $scope.getCompletedTasks = function (tasks) {
      return _.filter(tasks, function (task) {
        return task.status === 'done';
      });
    };

    $scope.getCurrentTasks = function (tasks) {
      return _.filter(tasks, function (task) {
        return task.status === 'doing';
      });
    };

    $scope.addTask = function (goal, description) {
      goal.tasks.push({
        description: description,
        status: 'doing'
      });
    };
  });

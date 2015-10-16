'use strict';

angular.module('goalsApp')
  .controller('MainCtrl', function ($scope, $http) {
    $scope.getGoals = function (goalsUrl) {
        $http({method: 'GET', url: goalsUrl, data: {}}).then(function(result) {
        $scope.goals = result.data.goals;
        $scope.categories = _.uniq(_.map($scope.goals, 'category'), 'name');
      });
    };

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

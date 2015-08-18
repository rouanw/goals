'use strict';

describe('Controller: MainCtrl', function () {

  beforeEach(module('goalsApp'));

  var MainCtrl,
    scope,
    httpBackend;

  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    httpBackend = $httpBackend;
    httpBackend.when('GET', 'data.json')
                           .respond({goals: 'goals'});
    scope = $rootScope.$new()
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));

  it('should fetch data and set buckets on the scope', function () {
    httpBackend.expectGET('data.json').and;
    httpBackend.flush();
    expect(scope.goals).toBe('goals');
  });

  describe('tasks', function () {
    var allTasks = [
      {
        "description": "Use better stamps",
        "status": "done"
      },
      {
        "description": "Use a courier",
        "status": "done"
      },
      {
        "description": "Work on our handwriting",
        "status": "doing"
      },
      {
        "description": "Use A4 envelopes",
        "status": "doing"
      }
    ];

    it('getCompletedTasks should return all tasks with a status of done', function () {
      var completedTasks = scope.getCompletedTasks(allTasks);
      expect(completedTasks.length).toBe(2);
      expect(completedTasks[0].status).toBe('done');
      expect(completedTasks[1].status).toBe('done');
    });

    it('getCurrentTasks should return all tasks with a status of doing', function () {
      var currentTasks = scope.getCurrentTasks(allTasks);
      expect(currentTasks.length).toBe(2);
      expect(currentTasks[0].status).toBe('doing');
      expect(currentTasks[1].status).toBe('doing');
    });
  });
});

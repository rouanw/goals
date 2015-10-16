'use strict';

describe('Controller: MainCtrl', function () {

  beforeEach(module('goalsApp'));

  var MainCtrl,
    scope,
    httpBackend;

  beforeEach(inject(function ($controller, $rootScope, $httpBackend) {
    httpBackend = $httpBackend;
    scope = $rootScope.$new();
    MainCtrl = $controller('MainCtrl', {
      $scope: scope
    });
  }));


  describe('when retrieving goals', function () { 
    var response = {
        goals: [
          {
            category: {
              "name": "Mail",
              "color": "#EF5BA1"
            },
          },
          {
            category: {
              "name": "Mail",
              "color": "#EF5BA1"
            },
          },
          {
            category: {
              "name": "Something else",
              "color": "#ABC123"
            }
          }
        ]
      };

    it('should fetch data and set buckets on the scope', function () {
      httpBackend.when('GET', 'someUrl').respond({goals: 'goals'});
      scope.getGoals('someUrl');
      httpBackend.expectGET('someUrl');
      httpBackend.flush();
      expect(scope.goals).toBe('goals');
    });
    
    it('should list categories', function () {
      httpBackend.when('GET', 'url')
                           .respond(response);
      scope.getGoals('url');
      httpBackend.flush();
      expect(scope.categories).toContain(response.goals[0].category);
      expect(scope.categories).toContain(response.goals[2].category);
    });

    it('should only list unique categories', function () {
      httpBackend.when('GET', 'url')
                           .respond(response);
      scope.getGoals('url');
      httpBackend.flush();
      expect(scope.categories.length).toBe(2);
    });

  });

  describe('when displaying tasks', function () {
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

  describe('when adding a task', function () {
    it('should use the text supplied as the description', function () {
      var goal = { tasks: []};
      scope.addTask(goal, 'a new task');
      expect(goal.tasks.pop().description).toBe('a new task');
    });

    it('should default the status to doing', function () {
      var goal = { tasks: []};
      scope.addTask(goal, 'a new task');
      expect(goal.tasks.pop().status).toBe('doing');
    })
  });
});

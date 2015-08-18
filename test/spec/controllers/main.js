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
});

/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

'use strict';

var utils = require('../../utils');

describe('Controller: CSoonCtrl', function () {

  // load the controller's module
  beforeEach(function () {
    angular.mock.module('GLA');
  });

  var ctrl, $scope, API, $controller;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _API_) {
    $scope = $rootScope.$new();
    API = _API_;
    $controller = _$controller_;
  }));

  it('should have a default "Coming soon!" message', function () {
    initCtrl();
    expect($scope.data.message).toBe('Coming soon!');
  });

  it('should show message returned by api', function () {
    spyOn(API, 'call').and.returnValue(utils.mockPromise({data: {text: 'apiMessage'}}));
    initCtrl();
    expect($scope.data.message).toBe('apiMessage');
  });

  it('should have an error handler if api fails', inject(function () {
    var fakePromise = utils.mockFailedPromise({info: 'failed response'});
    spyOn(fakePromise, 'then').and.callThrough();
    spyOn(API, 'call').and.returnValue(fakePromise);
    initCtrl();
    var promiseParams = fakePromise.then.calls.mostRecent().args;
    expect(promiseParams.length).toEqual(2);
  }));

  function initCtrl() {
    ctrl = $controller('CSoonCtrl', {
      $scope: $scope
    });
  }
});

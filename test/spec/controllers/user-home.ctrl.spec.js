/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

'use strict';

describe('Controller: UserHomeCtrl', function () {

  // load the controller's module
  beforeEach(angular.mock.module('GLA'));

  var ctrl,
    scope;

  // Initialize the controller and a mock scope
  beforeEach(inject(function ($controller, $rootScope) {
    scope = $rootScope.$new();
    ctrl = $controller('UserHomeCtrl');
  }));

  it('should have a user', function () {
    expect(ctrl.user).toBeDefined();
  });
});

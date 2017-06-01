/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

'use strict';

var utils = require('../../utils');

describe('Controller: RegisterCtrl', function () {

  // load the controller's module
  beforeEach(function () {
    angular.mock.module('GLA');
  });

  var ctrl, $scope, API, $controller, USER;

  // Initialize the controller and a mock scope
  beforeEach(inject(function (_$controller_, $rootScope, _API_, _USER_) {
    $scope = $rootScope.$new();
    API = _API_;
    $controller = _$controller_;
    USER = _USER_;
  }));

  it('should register on successful registration', inject(function (API) {
    spyOn(API, 'call').and.returnValue(utils.mockPromise({data: {id: 123}}));
    initCtrl();
    ctrl.submit();
    var callParams = API.call.calls.mostRecent().args[0];
    expect(callParams.action).toEqual('registerUser');
    expect(ctrl.done).toEqual(true);
  }));



  function initCtrl() {
    ctrl = $controller('RegisterCtrl', {
      $scope: $scope
    });
  }
});

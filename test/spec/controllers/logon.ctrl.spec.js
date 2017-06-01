/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

'use strict';

var utils = require('../../utils');

describe('Controller: LogOnCtrl', function () {

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
    // spyOn(USER, 'init');
  }));

  it('should set user on successful login', inject(function (API) {
    spyOn(API, 'call').and.returnValue(utils.mockPromise({data: {id: 123}}));
    initCtrl();
    ctrl.uname = 'test@user.com';
    ctrl.pass = 'psw';
    ctrl.submit();
    var callParams = API.call.calls.mostRecent().args[0];
    expect(callParams.action).toEqual('logOn');
    expect(callParams.payload.username).toEqual('test@user.com');
    expect(callParams.payload.password).toEqual('psw');
    expect(USER.data.SID).toEqual(123);
  }));



  function initCtrl() {
    ctrl = $controller('LogOnCtrl', {
      $scope: $scope
    });
  }
});

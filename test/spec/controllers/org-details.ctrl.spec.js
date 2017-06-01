/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

'use strict';

var utils = require('../../utils');

describe('Controller: OrgDetailsCtrl', function () {

  var CTRL_NAME = 'OrgDetailsCtrl';
  var ctrl, API, $controller, $scope;

  beforeEach(function () {
    angular.mock.module('GLA');
  });

  beforeEach(inject(function (_$controller_, _API_) {
    API = _API_;
    $controller = _$controller_;
    $scope = {};
  }));

  it('should call API with valid parameters to initialise organisation details', function () {
    spyOn(API, 'call').and.returnValue(utils.mockPromise({}));
    initCtrl();
    var callParams = API.call.calls.mostRecent().args[0];
    expect(callParams.action).toEqual('getOrgDetails');
    expect(callParams.organisationId).toEqual(123);
  });

  it('should call API with valid parameters to approve user registration', function () {
    spyOn(API, 'call').and.returnValue(utils.mockPromise({}));
    initCtrl();
    var user = {
      username: 'test@email.com'
    };
    $scope.approve(user);
    var callParams = API.call.calls.mostRecent().args[0];

    expect(callParams.action).toEqual('approveUser');
    expect(callParams.username).toEqual(user.username);
    expect(user.approved).toEqual(true);
  });

  it('should have an error handler if registration approval fails', inject(function () {
    var fakePromise = utils.mockFailedPromise({info: 'failed response'});
    spyOn(fakePromise, 'then').and.callThrough();
    spyOn(API, 'call').and.returnValue(fakePromise);
    initCtrl();

    var user = {
      username: 'test@email.com'
    };
    $scope.approve(user);
    var promiseParams = fakePromise.then.calls.mostRecent().args;
    expect(promiseParams.length).toEqual(2);
  }));

  function initCtrl() {
    ctrl = $controller(CTRL_NAME, {
      $scope: $scope,
      $state: {params: {orgId: 123}}
    });
  }
});

/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

'use strict';

var utils = require('../../utils');

describe('Controller: CSoonAdminCtrl', function () {

  var ctrl;

  beforeEach(function () {
    angular.mock.module('GLA');
  });

  beforeEach(inject(function($controller){
    ctrl = $controller('CSoonAdminCtrl');
  }));

  describe('submit()', function () {
    var USER;
    beforeEach(inject(function(_USER_){
      USER = _USER_;
      spyOn(USER, 'logOut');
    }));

    it('should call API with correct parameters', inject(function (API) {
      spyOn(API, 'call').and.returnValue(utils.mockPromise({}));
      ctrl.submit();
      var callParams = API.call.calls.argsFor(0)[0];
      expect(callParams.action).toEqual('saveMessage');
      expect(callParams.payload.code).toEqual('coming-soon');
    }));

    it('should logout after submit', inject(function (API) {
      spyOn(API, 'call').and.returnValue(utils.mockPromise({}));
      ctrl.submit();
      expect(USER.logOut).toHaveBeenCalled();
    }));
  });
});

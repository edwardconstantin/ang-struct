/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

describe('USER Service', function () {

  beforeEach(angular.mock.module('GLA'));

  it('is defined', inject(function (USER) {
    expect(USER).toBeDefined();
  }))

  it('has loggedOn property', inject(function (USER) {
    expect(USER.data.loggedOn).toBeDefined();
  }))

  it('has logOut method', inject(function (USER) {
    expect(USER.logOut).toBeDefined();
  }))

});

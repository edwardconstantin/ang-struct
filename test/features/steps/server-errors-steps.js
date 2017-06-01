/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

var chai = require('chai');
var chaiAsPromised = require('chai-as-promised');
chai.use(chaiAsPromised);
var expect = chai.expect;

module.exports = function () {
  this.Then(/^error modal will be shown$/, function (callback) {
    expect(element(by.id('server-error')).isPresent()).to.eventually.be.true.and.notify(callback);
  });
};

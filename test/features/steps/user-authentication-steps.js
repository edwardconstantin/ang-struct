/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

var chai = require('chai');
chai.use(require('chai-as-promised'));
var expect = chai.expect;
var config = require('../../testConfig.js');
var logOnPage = require('../pages/log-on-page.js');

module.exports = function () {
  this.Given(/^admin user types in correct username and password$/, function (callback) {
    logOnPage.load().username(config.adminUser.username).password(config.adminUser.password);
    callback();
  });

  this.When(/^user hits a return key$/, function (callback) {
    logOnPage.hitReturnKey();
    callback();
  });

  this.When(/^a user enters an invalid authentication email$/, function (callback) {
    // setting the password is not necessary but forces the focus out of the email field to display the validation error
    logOnPage.load().username('Heath.Pritchard@london').password('');
    callback();
  });

  this.Then(/^user should successfully log in$/, function (callback) {
    expect(browser.getCurrentUrl()).to.eventually.contain('/#/admin/organisations').and.notify(callback);
  });

  this.Then(/^he should see an authentication email validation error$/, function (callback) {
    expect(logOnPage.emailValidationError()).to.eventually.equal("Check your email").and.notify(callback);
  });
};

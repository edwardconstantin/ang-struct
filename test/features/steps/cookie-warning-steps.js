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
var logOnPage = require('../pages/log-on-page.js');
var cookieWarning = require('../pages/cookie-warning.js');
var config = require('../../testConfig.js');
var utils = require('../../utils.js');

module.exports = function () {
  this.Given(/^there are no cookies logged against the browser on the device$/, function () {
  });

  this.When(/^any external facing page on the application is accessed$/, function () {
    logOnPage.load();
  });

  this.Then(/^a modal will display informing the user about the GLA cookie policy$/, function (callback) {
    // Write code here that turns the phrase above into concrete actions
    expect(cookieWarning.element().isPresent()).to.eventually.be.true.and.notify(callback);
  });

  this.Then(/^The modal will display in a fixed position on the screen$/, function (callback) {
    expect(cookieWarning.element().getCssValue('position'))
      .to.eventually.equal('fixed').and.notify(callback);
  });


  this.Given(/^there is a cookie modal displaying on the page$/, function (callback) {
    logOnPage.load();
    expect(cookieWarning.element().isPresent()).to.eventually.be.true.and.notify(callback);
  });

  this.When(/^the user selects to dismiss the modal$/, function () {
    cookieWarning.closeBtn().click();
  });

  this.Then(/^the modal will not display$/, function (callback) {
    expect(cookieWarning.element().isPresent()).to.eventually.be.false.and.notify(callback);
  });

  this.Then(/^the user will not see the modal again on that browser on the device unless localStorage is cleared$/, function (callback) {
    logOnPage.load();
    expect(cookieWarning.element().isPresent()).to.eventually.be.false.and.notify(callback);
  });

  this.Given(/^I have a cookie policy modal on the page I am viewing$/, function (callback) {
    browser.executeScript(clearLocalStorage).then(function(){
      logOnPage.load();
      expect(cookieWarning.element().isPresent()).to.eventually.be.true.and.notify(callback);
    });
    // browser.sleep(500);
  });

  this.When(/^I click or tap the privacy policy link in the modal$/, function (callback) {
    cookieWarning.policyLink().click().then(callback);
  });

  this.Then(/^the GLA privacy policy page will display in a new tab$/, function (callback) {
    waitForPolicyTab(function (handles) {
      expect(handles.length).to.be.equal(2);
      callback();
    });
  });

  function clearLocalStorage() {
    window.localStorage.clear();
  }

  function waitForPolicyTab(callback) {
    browser.getAllWindowHandles().then(function (handles) {
      if (handles.length !== 2) {
        browser.sleep(500);
        waitForPolicyTab(callback);
      } else {
        callback(handles);
      }
    });
  }
};

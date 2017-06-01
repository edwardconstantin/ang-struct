/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

//http://chaijs.com/
var chai = require('chai');

//https://github.com/domenic/chai-as-promised/
var chaiAsPromised = require('chai-as-promised');
var logOnPage = require('../pages/log-on-page.js');
var config = require('../../testConfig.js');
var utils = require('../../utils');
chai.use(chaiAsPromised);

var expect = chai.expect;

module.exports = function () {
  this.Given(/^any user$/, function (callback) {
    callback();
  });

  /*  this.Then(/^an IE (\d+) browser$/, function (arg1, callback) {
   browser.getCapabilities().then(function (cap) {
   //console.info('Browser Name ::', cap._cap);
   });
   expect(true).to.be.true;
   callback();
   });*/

  /*
   this.When(/^"([^"]*)" page is accessed$/, function (arg1, callback) {
   browser.get(config.baseURL + '/#/' + arg1);
   callback()
   });*/

  this.When(/^"([^"]*)" page is accessed$/, function (page, callback) {
    browser.executeScript('window.location = \'/#/' + page + '\';').then(callback);
  });

  this.When(/^any page is accessed$/, function (callback) {
    browser.get(config.baseURL + '/#/home');
    callback()
  });

  this.Then(/^page title will be "([^"]*)"$/, function (arg1, callback) {
    expect(browser.getTitle()).to.eventually.equal(arg1).and.notify(callback);
  });

  this.Then(/^the page text will contain "([^"]*)"$/, function (arg1, callback) {
    element(by.css('body')).getText().then(function (text) {
      expect(utils.cleanText(text)).to.contain(arg1);
      callback();
    });
  });

  this.Then(/^the header will contain the text "([^"]*)"$/, function (arg1, callback) {
    expect(element(by.css('.gla-header')).getText()).to.eventually.contain(arg1).and.notify(callback);
  });

  this.Then(/^the header will not contain the text "([^"]*)"$/, function (arg1, callback) {
    expect(element(by.css('.gla-ops')).getText()).to.eventually.not.equal(arg1).and.notify(callback);
  });

  this.When(/^the approved RP user logs in$/, function (callback) {
    logOnPage
      .load()
      .username(config.rpUserApproved.username)
      .password(config.rpUserApproved.password)
      .submit();
    callback();
  });

  this.When(/^the unapproved RP user logs in$/, function (callback) {
    logOnPage
      .load()
      .username(config.rpUserUnapproved.username)
      .password(config.rpUserUnapproved.password)
      .submit();
    callback();
  });

  this.When(/^the GLA admin user logs in$/, function (callback) {
    logOnPage
      .load()
      .username(config.adminUser.username)
      .password(config.adminUser.password)
      .submit();
    callback();
  });

  this.Given(/^an unauthenticated user$/, function (callback) {
    // browser.get('#/home');
    browser.executeScript(function () {
      var $injector = angular.element('body').injector();
      var API = $injector.get('API');

      API.call({
        action: 'logOut'
      });
    }).then(callback);
  });

  this.When(/^"([^"]*)" API is called$/, function (apiEndpoint, callback) {
    // browser.get('#/home');
    browser.executeScript('window.cucumberAPI = \'' + apiEndpoint + '\';');
    browser.executeScript(function () {
      var $injector = angular.element('body').injector();
      var API = $injector.get('API');

      API.call({
        action: window.cucumberAPI
      });

    }).then(callback);
  });

  this.When(/^the "([^"]*)" menu is clicked$/, function (menuPath, callback) {
    var menuItems = menuPath.split('/');
    var menuEl = element(by.css('top-menu nav'));
    var topLevelMenuItem = menuEl.element(by.linkText(menuItems[0].toUpperCase()));

    if (menuItems.length === 1) {
      topLevelMenuItem.click().then(callback);
    } else {
      browser.actions().mouseMove(topLevelMenuItem).perform();
      menuEl.element(by.linkText(menuItems[1])).click().then(callback);
    }
  });

  this.Given(/^browser width is (\d+) pixels size$/, function (browserWidth, callback) {
    browser.driver.manage().window().setSize(+browserWidth, config.browserSize.lg.height).then(callback);
  });
};

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
  this.Then(/^there will be no menu shown\.$/, function (callback) {
    expect(element(by.css('top-menu')).isPresent()).to.eventually.be.false.and.notify(callback);
  });

  this.Then(/^he views the organisations list page$/, function (callback) {
    callback();
  });

  this.Then(/^a menu bar is displayed$/, function (callback) {
    expect(element(by.css('top-menu')).isPresent()).to.eventually.be.true.and.notify(callback);
  });

  this.Then(/^the menu bar has a "([^"]*)" menu$/, function (menuItemText, callback) {
    var promise = element.all(by.css('top-menu nav ul a'));
    promise.map(function (el) {
      return el.getText();
    }).then(function (menuItems) {
      expect(menuItems.indexOf(menuItemText.toUpperCase())).to.be.above(-1);
      callback();
    });
  });

  this.Then(/^the menu bar does not have a "([^"]*)" menu$/, function (menuItemText, callback) {
    // browser.pause();
    var promise = element.all(by.css('top-menu nav ul a'));
    promise.map(function (el) {
      return el.getText();
    }).then(function (menuItems) {
      expect(menuItems.indexOf(menuItemText.toUpperCase())).to.be.equal(-1);
      callback();
    });
  });

  this.Then(/^the menu should be displayed as a hamburger icon$/, function (callback) {
    expect(element(by.css('top-menu .navbar-toggle.collapsed')).isPresent()).to.eventually.be.true.and.notify(callback);
  });

  this.Then(/^hamburger icon should be with the text "([^"]*)"$/, function (text, callback) {
    expect(element(by.css('.navbar-menu-text')).getText()).to.eventually.contain(text.toUpperCase()).and.notify(callback);
  });

  this.Then(/^hamburger icon should be without the text "([^"]*)"$/, function (text, callback) {
    expect(element(by.css('.navbar-menu-text')).getText()).to.not.eventually.contain(text.toUpperCase()).and.notify(callback);
  });
};

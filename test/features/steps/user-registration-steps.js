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
var regPage = require('../pages/registration-page.js');
var config = require('../../testConfig.js');
var WELCOME_HEADING = 'You are logged in to GLA Open Project System';
var WELCOME_MESSAGE = 'This service is currently under development and will eventually become GLA\'s main system for managing grant projects';
var utils = require('../../utils.js');
module.exports = function () {

  /*var newUser = {
    firstName: 'test-name',
    surname: 'test-surname',
    email: Date.now() + '@test.com',
    phone: 07943315020,
    password: '5omePassword',
    imsNumber: 'L4241'
  };

  this.Given(/^the user has registered$/, function (callback) {
    regPage
      .load()
      .firstName(newUser.firstName)
      .surname(newUser.surname)
      .email(newUser.email)
      .phone(newUser.phone)
      .password1(newUser.password)
      .password2(newUser.password)
      .imsNumber(newUser.imsNumber)
      .submit(callback);
  });*/

/*  this.Given(/^the registration has not been approved$/, function (callback) {
     expect(element(by.css('.thank-you')).getText())
       .to.eventually.contain('We will let you know when your account will be ready to use.')
       .and.notify(callback);
  });*/

  /**
   * Admin user logs in, selects organisation by ims number and approves user by email.
   * After that it validates if user row has 'Approved' text instead of the button
   */
/*  this.Then(/^the registration has been approved$/, function (callback) {
    logOnPage.load()
      .username(config.adminUser.username)
      .password(config.adminUser.password)
      .submit();

    var selectedOrgPage = organisationsPage.selectRowByImsNumber(newUser.imsNumber);
    selectedOrgPage.approveByEmail(newUser.email);
    expect(selectedOrgPage.approvedTextByEmail(newUser.email))
      .to.eventually.contain('Approved')
      .and.notify(callback);
  });*/

  this.When(/^the user clicks register link$/, function (callback) {
    regPage.clickRegisterLink();
    callback();
  });

  this.When(/^a user enters an invalid registration email$/, function (callback) {
    // setting the password is not necessary but forces the focus out of the email field to display the validation error
    regPage.load().email('Heath.Pritchard@london').password1('');
    callback();
  });

  this.Then(/^the logged in welcome heading will display$/, function (callback) {
    expect(regPage.getContent())
      .to.eventually.contain(WELCOME_HEADING)
      .and.notify(callback);
  });

  this.Then(/^the logged in welcome heading is "([^"]*)"$/, function (msg, callback) {
    expect(msg).to.be.equal(WELCOME_HEADING);
    callback();
  });

  this.Then(/^the logged in welcome message will display$/, function (callback) {
    regPage.getContent().then(function(text){
      expect(utils.cleanText(text)).to.contain(WELCOME_MESSAGE);
      callback();
    });
  });

  this.Then(/^the logged in welcome message is "([^"]*)"$/, function (msg, callback) {
    expect(msg).to.be.equal(WELCOME_MESSAGE);
    callback();
  });

  this.Then(/^the approved RP user name will be displayed in the header$/, function (callback) {
    expect(regPage.getUsername())
      .to.eventually.contain(config.rpUserApproved.username)
      .and.notify(callback);
  });

  this.Then(/^the unapproved RP user name will be displayed in the header$/, function (callback) {
    expect(regPage.getUsername())
      .to.eventually.contain(config.rpUserUnapproved.username)
      .and.notify(callback);
  });

  this.Then(/^the user will not see a message about pending approval$/, function (callback) {
    expect(regPage.getContent())
      .to.not.eventually.contain('Your registration has not yet been approved')
      .and.notify(callback);
  });

  this.Then(/^he should see a registration email validation error$/, function (callback) {
    expect(regPage.emailValidationError()).to.eventually.equal('Check your email').and.notify(callback);
  });
};

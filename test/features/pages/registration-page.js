/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */
module.exports = {
  load: function () {
    browser.get('/#/registration');
    return this;
  },

  firstName: function (firstName) {
    element(by.css('input[name=\'fname\']')).clear().sendKeys(firstName);
    return this;
  },

  surname: function (surname) {
    element(by.css('input[name=\'sname\']')).clear().sendKeys(surname);
    return this;
  },

  email: function (email) {
    element(by.css('input[name=\'email\']')).clear().sendKeys(email);
    return this;
  },

  phone: function (phone) {
    element(by.css('input[name=\'phone\']')).clear().sendKeys(phone);
    return this;
  },

  password1: function (pass1) {
    element(by.css('input[name=\'pass\']')).clear().sendKeys(pass1);
    return this;
  },

  password2: function (pass1) {
    element(by.css('input[name=\'passv\']')).clear().sendKeys(pass1);
    return this;
  },

  imsNumber: function (pass2) {
    element(by.css('input[name=\'imsnum\']')).clear().sendKeys(pass2);
    return this;
  },

  submit: function () {
    element(by.buttonText('REGISTER')).click();
    return this;
  },

  getContent: function () {
    return element(by.css('.text-center')).getText();
  },

  getUsername: function(){
    return element(by.id('hdr-username')).getText();
  },

  emailValidationError: function() {
    return element(by.css('span[ng-show="regForm.email.$error.pattern"]')).getText();
  }
};


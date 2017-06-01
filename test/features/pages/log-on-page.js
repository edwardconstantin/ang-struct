/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */
module.exports = {
  load: function () {
    browser.get('/#/logon');
    return this;
  },

  username: function (username) {
    element(by.css('input[ng-model=\'logon.uname\']')).clear().sendKeys(username);
    return this;
  },

  password: function (password) {
    element(by.css('input[ng-model=\'logon.pass\']')).clear().sendKeys(password);
    return this;
  },

  hitReturnKey: function () {
    element(by.css('input[ng-model=\'logon.uname\']')).sendKeys(protractor.Key.ENTER);
    return this;
  },

  submit: function () {
    element(by.buttonText('LOGIN')).click();
    return this;
  },

  emailValidationError: function() {
    return element(by.css('span[ng-show="logonForm.email.$error.pattern"]')).getText();
  }
};


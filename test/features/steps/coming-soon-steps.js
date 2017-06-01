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

chai.use(chaiAsPromised);

var expect = chai.expect;

var fs = require('fs');
var path = require('path');

module.exports = function () {

  this.Then(/^page will contain an image with alternate text "([^"]*)"$/, function (arg1, callback) {
    expect(element(by.css('.gla-banner img')).getAttribute('alt')).to.eventually.equal(arg1).and.notify(callback);
  });


  this.When(/^the "([^"]*)" API is called$/, function (arg1, callback) {

    browser.executeAsyncScript(function (cb) {

      var $injector = angular.element('body').injector();

      var API = $injector.get('API');
      var USER = $injector.get('USER');

      cb(USER.data);

/*      API.call({
        action: 'getMessage',
        resource: 'http://gladevapp.cepwipbmwf.eu-west-1.elasticbeanstalk.com'
      }).then(function (response) {
        console.log('---------------------------');
        cb(response.data.text);
      });*/


    }).then(function (output) {
      console.log(output);
    });

    callback();

  });

};

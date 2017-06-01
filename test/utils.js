/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

var config = require('./testConfig.js');
var request = require('request').defaults({jar: true});

module.exports = {
  cleanText: function (text) {
    var textWithoutSpecialCharacters = (text || '').replace(/[\r\n]+/g, ' ');
    var textWithSingleWhiteSpace = textWithoutSpecialCharacters.replace(/\s\s+/g, ' ');
    return textWithSingleWhiteSpace;
  },

  mockPromise: function (valueToReturn) {
    return {
      then: function (callback) {
        callback(valueToReturn);
      }
    }
  },

  mockFailedPromise: function (valueToReturn) {
    return {
      then: function (successCallback, errorCallback) {
        if (errorCallback) {
          errorCallback(valueToReturn);
        }
      }
    }
  },

  unapproveUser: function (username, callback) {
    api.loginAsAdmin(function(err){
      if(err){
        callback(err);
      }else{
        api.unapproveUser(username, callback);
      }
    });
  }
};

var api = {
  loginAsAdmin: function (callback) {
    var options = {
      uri: config.baseURL + '/api/v1/sessions',
      method: 'POST',
      json: {
        username: config.adminUser.username,
        password: config.adminUser.password
      }
    };

    request(options, function (error, response, body) {
      if (error || response.statusCode !== 200) {
        console.error(error, response.statusCode, body);
        callback(new Error('Failed to login'));
      }else{
        callback();
      }
    });
  },

  unapproveUser: function (username, callback) {
    var options = {
      uri: config.baseURL + '/api/v1/users/' + username + '/approved',
      method: 'PUT',
      body: 'false'
    };
    request(options, function (error, response, body) {
      if (error || response.statusCode !== 200) {
        console.error(error, response.statusCode, body);
        callback(new Error('Failed to login'));
      }else{
        callback();
      }
    });
  }
};

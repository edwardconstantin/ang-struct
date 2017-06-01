/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

var config = require('../../testConfig.js');
var utils = require('../../utils.js');
module.exports = function () {
  this.setDefaultTimeout(20 * 1000);

  this.After({tags: ['@browserSizeReset']}, function (scenario, callback) {
    browser.driver.manage().window().setSize(config.browserSize.lg.width, config.browserSize.lg.height).then(callback);
  });

  this.After({tags: ['@unapproveUser']}, function (scenario, callback) {
    utils.unapproveUser(config.rpUserUnapproved.username, callback);
  });
};

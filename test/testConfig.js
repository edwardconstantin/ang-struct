/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

var fs = require('fs');
var path = require('path');
var _ = require('lodash');

var config = {
  adminUser: {
    username: process.env.ADMIN_USERNAME,
    password: process.env.ADMIN_PASSWORD
  },
  rpUserApproved: {
    username: 'testapproved@gla.com',
    password: 'London.123',
    imsNumber: 'L4241'
  },

  rpUserUnapproved: {
    username: 'unapprovedgla@gmail.com',
    password: 'London.123',
    imsNumber: 'L4241'
  },

  browserSize: {
    lg: {width: 1200, height: 768},
    md: {width: 992, height: 768},
    sm: {width: 768, height: 768},
    xs: {width: 767, height: 768},
    xxs: {width: 400, height: 768}
  },

  baseURL: process.env.E2E_BASE_URL || 'http://ops-dev.london.gov.uk'
};


/**
 *  If config.local.json is present it is used instead of command line arguments
 *  File is present on local box only and shouldn't be committed (it is added to .gitignore)
 */

try {
  var localConfig = JSON.parse(fs.readFileSync(path.resolve(__dirname, 'testConfig.local.json')));
  console.log('BASE URL: '+config.baseURL);
  _.assign(config, localConfig);
} catch (e) {
  //Valid case on none local environment where command line arguments are passed instead
}

module.exports = config;

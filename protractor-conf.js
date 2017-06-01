/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

var config = require('./test/testConfig.js');

exports.config = {
  baseUrl: config.baseURL,
  seleniumAddress: 'http://127.0.0.1:4444/wd/hub',
  framework: 'custom',
  frameworkPath: 'node_modules/protractor-cucumber-framework',
  specs: [
    'test/features/*.feature'
  ],

  resultJsonOutputFile: '../cucumber_report.json',
  capabilities: {
    // browserName: 'chrome',
    //browserName: 'firefox',
    //browserName: 'safari',

    browserName: 'phantomjs',
    'phantomjs.binary.path': './node_modules/phantomjs-prebuilt/bin/phantomjs',
    'phantomjs.cli.args': '--debug=true --webdriver --webdriver-logfile=webdriver.log --webdriver-loglevel=DEBUG',
    platform: 'ANY'
  },
  cucumberOpts: {
    require: 'test/features/steps/*.js',
    format: 'pretty'
  },

  onPrepare: function(callback) {
    browser.driver.manage().window().setSize(config.browserSize.lg.width, config.browserSize.lg.height);
    //Initialise some page to be able to run browser.executeScript
    browser.get('/#/home').then(callback);
  }
};

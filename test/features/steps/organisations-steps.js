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
var config = require('../../testConfig.js');
var orgPage = require('../pages/organisations-page.js');
var utils = require('../../utils.js');

module.exports = function () {

  var lastPageNumber;
  var selectedOrgPage;

  this.Given(/^there are more than 50 organisations/, function (callback) {
    // we are assuming that we will always have more than 10 organisations
    callback();
  });

  this.Given(/^he navigates to the "([^"]*)" organisation details page$/, function (organisationName, callback) {
    // TODO : this is not idea, probably try and navigate directly?
    orgPage.getColumnHeaderByText('ID NO.').click();
    selectedOrgPage = orgPage.selectRowByOrgName(organisationName);
    callback();
  });

  this.When(/^the organisations list is displayed$/, function (callback) {
    expect(orgPage.getTable().isPresent()).to.eventually.be.true.and.notify(callback);
  });

  this.When(/^I click on the column "([^"]*)" header$/, function (columnTitle, callback) {
    orgPage.getColumnHeaderByText(columnTitle).click();
    callback();
  });

  this.When(/^the "([^"]*)" column values are of equal value$/, function (columnTitle, callback) {
    callback();
  });

  this.When(/^he clicks on the "Approve" button for user "([^"]*)"$/, function (username, callback) {
    selectedOrgPage.approveByEmail(username);
    callback();
  });

  this.Then(/^there will be no "([^"]*)" column$/, function (columnTitle, callback) {
    expect(orgPage.getColumnHeaderByText(columnTitle).isPresent()).to.eventually.be.false.and.notify(callback);
  });

  this.Then(/^the first column will have the title "([^"]*)"$/, function (columnTitle, callback) {
    expect(orgPage.getColumnHeaderByIndex(0).getText()).to.eventually.equal(columnTitle).and.notify(callback);
  });

  this.Then(/^I will see how many organisations in total are available$/, function (callback) {
    expect(orgPage.paginationSummary()).to.eventually.contain('Showing 1 - 50 of ').and.notify(callback);
  });

  this.Then(/^each page will display (\d+) organisations$/, function (nbRows, callback) {
    expect(orgPage.getRows().count()).to.eventually.equal(parseInt(nbRows)).and.notify(callback);
  });

  this.Then(/^I will see how many pages are available to click through$/, function (callback) {
    orgPage.paginationLinks().count().then(function(nbLinks) {
      expect(orgPage.paginationLinks().get(0).getText()).to.eventually.equal('Previous');
      expect(orgPage.paginationLinks().get(nbLinks - 1).getText()).to.eventually.equal('Next');
      orgPage.paginationLinks().get(nbLinks - 2).getText().then(function(text) {
        lastPageNumber = parseInt(text);
        expect(lastPageNumber).to.not.be.null;
        callback();
      });
    });
  });

  this.Then(/^I will be able to paginate forwards through the pages until I am at the last page of organisations$/, function (callback) {
    for (var i=0; i<lastPageNumber; i++) {
      orgPage.paginationNext().click();
    }
    expect(orgPage.paginationNext().getAttribute('disabled')).to.eventually.equal('true').and.notify(callback);
  });

  this.Then(/^I will be able to paginate backwards through the pages until I am back to the first page of 50 organisations$/, function (callback) {
    for (var i=0; i<lastPageNumber; i++) {
      orgPage.paginationPrevious().click();
    }
    expect(orgPage.paginationPrevious().getAttribute('disabled')).to.eventually.equal('true').and.notify(callback);
  });

  this.Then(/^the table is sorted ([^"]*) by column "([^"]*)" ([^"]*)$/, function (sortType, columnTitle, sortDir, callback) {
    orgPage.getColumnRows(columnTitle).map(function(el) {
      return el.getText();
    }).then(function(values) {
      var sorted = values.slice().sort(function (a, b) {
        if (sortType === 'numerically') {
          return a - b;
        }
        else {
          // need to match back end sorting with javascript's
          var newA = a.replace(' ', '').toLowerCase();
          var newB = b.replace(' ', '').toLowerCase();
          return newA.localeCompare(newB);
        }
      });

      if ('descending' === sortDir) {
        sorted.reverse();
      }

      expect(values).to.deep.equal(sorted);

      callback();
    });
  });

  this.Then(/^the button will not display and will be replaced by the word "([^"]*)" for user "([^"]*)"$/, function (word, username, callback) {
    expect(selectedOrgPage.approvedTextByEmail(username)).to.eventually.contain(word).and.notify(callback);
  });

};

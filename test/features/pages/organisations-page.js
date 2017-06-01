/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */
var selectedOrganisationPage = require('./selected-organisation-page.js');
module.exports = {
  load: function () {
    browser.get('/#/admin/organisations');
    return this;
  },

  selectRowByOrgName: function (name) {
    var tableRow = element(by.cssContainingText('.org-table table tr', name));
    tableRow.click();
    return selectedOrganisationPage;
  },

  getTable: function () {
    return element(by.css('.org-table table'));
  },

  getColumnHeaderByText: function (columnTitle) {
    return element(by.cssContainingText('.org-table table thead  th', columnTitle));
  },

  getColumnHeaderByIndex: function (index) {
    return element.all(by.css('.org-table table thead  th')).get(index);
  },

  paginationSummary: function() {
    return element.all(by.css('.pagination-summary')).get(0).getText();
  },

  getRows: function() {
    return element.all(by.css('.org-table table tbody tr'));
  },

  paginationLinks: function() {
    return element.all(by.css('ul.pagination a'));
  },

  paginationNext: function() {
    return element.all(by.cssContainingText('a', 'Next')).get(0);
  },

  paginationPrevious: function() {
    return element.all(by.cssContainingText('a', 'Previous')).get(0);
  },

  getColumnRows: function(columnTitle) {
    var columnTitleIndexes = {
      'ID NO.': 1,
      'ORG. NAME': 2,
      'REGULATED?': 5
    };
    return element.all(by.css('.org-table table tbody tr td:nth-of-type('+columnTitleIndexes[columnTitle]+')'));
  }

};


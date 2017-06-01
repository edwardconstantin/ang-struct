/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */
module.exports = {
  load: function (id) {
    browser.get('/#/admin/organisations/' + id);
    return this;
  },

  approveByEmail: function (email) {
    var tableRow = element(by.cssContainingText('.org-user', email));
    var approveButton = tableRow.element(by.buttonText('Approve'));
    approveButton.click();
    return this;
  },

  approvedTextByEmail: function(email){
    var tableRow = element(by.cssContainingText('.org-user', email));
    var approvedTextEl = tableRow.element(by.css('.org-user-approved'));
    return approvedTextEl.getText();
  }
};


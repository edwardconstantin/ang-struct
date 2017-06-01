/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */
module.exports = {
  element: function () {
    return element(by.css('.gla-cookie-warning'));
  },

  closeBtn: function(){
    return element(by.css('.gla-cookie-warning .close-button'));
  },

  policyLink: function(){
    return element(by.css('.gla-cookie-warning .policy-link'));
  }
};


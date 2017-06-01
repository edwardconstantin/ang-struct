/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

'use strict';

angular.module('GLA')
  .controller('CSoonAdminCtrl', ['API', 'USER', function (API, USER) {
    var csoon = this;

    csoon.submit = function () {
      API.call({
        action: 'saveMessage',
        payload: {
          code: 'coming-soon',
          text: csoon.message
        }
      }).then(function () {
        USER.logOut();
      });
    }
  }]);

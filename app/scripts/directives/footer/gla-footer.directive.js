/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

'use strict';
angular.module('GLA').directive('glaFooter', function (API) {
  return {
    restrict: 'E',
    templateUrl: 'scripts/directives/footer/gla-footer.tpl.html',
    controllerAs: '$ctrl',
    controller: function ($document, API, USER, $uibModal) {
      var ctrl = this;
      API.call({
        action: 'getEnvironment'
      }).then(function (response) {
        if (response && response.data && response.data.text) {
          ctrl.environment = response.data.text;
        }
      });

      $document.bind("keypress", function (event) {
        //console.debug(event)
        if (event.altKey && event.charCode === 172) {
          USER.logOut();
        }

        if (event.altKey && event.charCode === 730) {
            API.call({action: 'getError'});
        }
      });

    }
  };
});

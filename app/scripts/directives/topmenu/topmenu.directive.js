/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

'use strict';
angular.module('GLA').directive('topMenu', function () {
  return {
    restrict: 'E',
    templateUrl: 'scripts/directives/topmenu/topmenu.tpl.html',
    controller: function ($scope, USER) {

      $scope.isAdmin = (USER.data.primaryRole === 'Admin') ? true : false;

      $('.navbar-collapse a').click(function (e) {
        //var dToggle = e.target.attributes.getNamedItem('data-toggle');
        //if (dToggle && dToggle.value != 'dropdown') {
          $('.navbar-collapse').collapse('hide');
        //}
      });

    }
  };
});

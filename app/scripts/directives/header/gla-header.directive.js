/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

'use strict';
angular.module('GLA').directive('glaHeader', function () {
  return {
    restrict: 'E',
    templateUrl: 'scripts/directives/header/gla-header.tpl.html',
    controller: function ($scope, USER) {
      $scope.userData = USER.data;
      $scope.$on('user.logout', function () {
        $scope.userData = USER.data;
      });
    }
  };
});

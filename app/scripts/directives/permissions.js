/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

'use strict';

/**
 * @ngdoc directive
 * @name GLA.directive:glaPermissionChecker
 * @description
 * # glaPermissionChecker
 *
 * USAGE:
 * <span gla-permission-checker required-permissions="['AttachFile','IssueEquipmentAllKeys']" all-permissions-needed="true">123</span>
 */

angular.module('GLA')
  .directive('glaPermissionChecker', ['glaPermissions', function (glaPermissions)
  {

    // controller
    var glaPermissionCheckerDirectiveCtrl = function ($scope) {

    };

    return {
      restrict: 'A',
      // scope: {
      //   // list of permissions to check for
      //   requiredPermissions: '=',
      //   // optional, check that all permissions are there
      //   allPermissionsNeeded: '='
      // },
      controller: ['$scope', boerPermissionCheckerDirectiveCtrl],
      controllerAs: 'boerPermissionCheckerCtrl',
      // bindToController: {}, // change the bindToController
      link: function ($scope, element, attrs) {
        var requiredPermissions = $scope.$eval(attrs.requiredPermissions);
        var allPermissionsNeeded = $scope.$eval(attrs.allPermissionsNeeded) || false;

        var hasPermission = false;
        if (!allPermissionsNeeded) {
          hasPermission = _.find(requiredPermissions, function (permission) {
            return glaPermissions.userHasPermission(permission);
          });
        } else {
          hasPermission = true;
          _.each(requiredPermissions, function (permission) {
            if (!glaPermissions.userHasPermission(permission)) {
              hasPermission = false;
            }
          });
        }
        if (!hasPermission) {
          element[0].outerHTML = '<!-- REMOVED by glaPermissionChecker as permissions are false -->';
        }
      }
    };
}]);

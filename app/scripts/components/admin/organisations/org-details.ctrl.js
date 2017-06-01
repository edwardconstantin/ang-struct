/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

'use strict';

angular.module('GLA')
  .controller('OrgDetailsCtrl', ['$scope', '$state', 'API', function ($scope, $state, API) {

    API.call({
      action: 'getOrgDetails',
      organisationId: $state.params.orgId
    }).then(
      // Success
      function successCallback(response) {
        $scope.org = response.data;
        console.log(response);
      },
      // Error
      function errorCallback(error) {
        console.error(error);
      }
    );

    $scope.approve = function (user) {
      API.call({
        action: 'approveUser',
        username: user.username
      }).then(
        // Success
        function successCallback(response) {
          user.approved = true;
        },
        // Error
        function errorCallback(error) {
          console.error('could not approve user ' + user.username);
        }
      );
    }
  }]);

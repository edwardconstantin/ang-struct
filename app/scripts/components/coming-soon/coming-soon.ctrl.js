/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

'use strict';

angular.module('GLA')
  .controller('CSoonCtrl', ['$scope', '$http', 'API', function ($scope, $http, API) {
    $scope.data = {
      message: 'Coming soon!'
    };

    API.call({
      action: 'getMessage'
    }).then(
      // Success
      function successCallback(response) {
        $scope.data.message = response.data.text;
      },
      // Error
      function errorCallback(error) {
        console.error(error);
      }
    );
  }]);

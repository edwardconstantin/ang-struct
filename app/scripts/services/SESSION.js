/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

angular.module('GLA')
  .config(function ($httpProvider) {
    $httpProvider.interceptors.push(function ($q, $injector, $sessionStorage) {
      return {

        'response': function (response) {
            /*var modal = $injector.get('$uibModal');
            var modalInstance = modal.open({
              animation: true,
              templateUrl: 'scripts/components/misc/server-error.tpl.html',
              size: 'md'
            });*/
            return response;
        },

        'responseError': function (error) {

          var state = $injector.get('$state');
          var user = $injector.get('USER');

          switch (error.status) {

            // Unauthorized
          case 401:
            $sessionStorage.$reset();
            user.data = {};
            state.go('logon');
            break;

            // Internal server error
          case 500:
            var modal = $injector.get('$uibModal');
            var modalInstance = modal.open({
              animation: true,
              templateUrl: 'scripts/components/misc/server-error.tpl.html',
              size: 'md',
              controller: ['$scope', 'message', function ($scope, message) {
                $scope.error = message;
              }],
              resolve: {
                message: function () {
                  return error.data;
                }
              }
            });
            break;

          default:
            return;

          }

          return $q.reject(error);
        }

      };
    });
  });

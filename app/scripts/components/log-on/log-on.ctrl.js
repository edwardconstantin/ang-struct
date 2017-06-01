/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

'use strict';

angular.module('GLA')
  .controller('LogOnCtrl', ['$scope', '$cookies', '$sessionStorage', '$rootScope', '$state', 'API', 'USER', '$timeout',
  function ($scope, $cookies, $sessionStorage, $rootScope, $state, API, USER, $timeout) {

      var logon = this;

      logon.error = false;

      if ($rootScope.devMode) {
        logon.uname = $rootScope.config.testData.user;
        logon.pass = $rootScope.config.testData.passwd;
      }

      logon.submit = function () {

        API.call({
            action: 'logOn',
            payload: {
              username: logon.uname,
              password: logon.pass
            }
          })
          .then(

            // Success
            function successCallback(response) {
              logon.error = false;

              USER.init(response);

              console.log('Authenticated.', $sessionStorage.user);

              if (USER.data.primaryRole === 'Admin') {
                $state.go('admin.organisations');
              } else {
                $state.go('user');
              }
            },

            // Error
            function errorCallback(error) {
              logon.error = true;
              console.error(error);
            }

          );


      };

  }]);

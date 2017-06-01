/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

'use strict';

angular.module('GLA')
  .controller('RegisterCtrl', ['$scope', '$cookies', '$rootScope', '$state', 'API', 'USER', '$timeout',
  function ($scope, $cookies, $rootScope, $state, API, USER, $timeout) {

      var register = this;

      register.done = false;

      $scope.regdata = {};

      if ($rootScope.devMode) {
        $scope.regdata = $rootScope.config.testData.register;
      }

      register.checkImsNumber = function() {
        API.call({
          action: 'getOrgNameByImsNumber',
          imsNumber: $scope.regdata.imsNumber
        })
          .then(
          // Success
          function successCallback(response) {
            register.imsNumberValidationError = false;
            register.imsNumberOrgName = response.data;
            console.log('org with ims number '+$scope.regdata.imsNumber+' found.');
          },
          // Error
          function errorCallback(error) {
            register.imsNumberValidationError = true;
          }
        );
      };

      register.submit = function () {
        API.call({
            action: 'registerUser',
            payload: $scope.regdata
          })
          .then(
          // Success
          function successCallback() {
            register.done = true;
            $('body section').addClass('dark-bg');
          },
          // Error
          function errorCallback(error) {
            register.errors = {};
            error.data.errors.map( function (i) { register.errors[i.name] = i.description } );
            //register.regForm.$setValidity('emailexists', false, register.regForm);
            console.log(register.errors);
          }
        );

      }


  }]);

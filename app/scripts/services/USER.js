/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

'use strict'; // jshint ignore:line

angular.module('GLA')

.service('USER', ['$rootScope', '$state', '$sessionStorage', 'API', function ($rootScope, $state, $sessionStorage, API) {

  var user = this;

  user.data = {
    loggedOn: false
  };

  user.init = function (response) {
    user.data.loggedOn = true;
    user.data.SID = response.data.id;
    _.assign(user.data, response.data.user);
    $sessionStorage.user = user.data;
  };

  user.logOut = function () {
    API.call({
        action: 'logOut'
      })
      .then(function (response) {
        user.data = {
          loggedOn: false
        };
        $sessionStorage.$reset();
        $rootScope.$broadcast('user.logout');
        $state.go('home');
      });
  }

}]);

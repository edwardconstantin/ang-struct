/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

'use strict';

angular.module('GLA', [
    'ui.bootstrap',
    'ngAnimate',
    'ngCookies',
    'ngMessages',
    'ngResource',
    'ngRoute',
    'ngSanitize',
    'ngTouch',
    'ui.router',
    'ui.bootstrap',
    'validation.match',
    'ngStorage',
    //'ngPasswordStrength',
    'smart-table'
  ])

.run( function ($window, $rootScope, $state, $stateParams, $sessionStorage, APIConf, USER) {

  // Check for any active session
  if ($sessionStorage.user) {
    USER.data.loggedOn = true;
    angular.extend(USER.data, $sessionStorage.user);
  }

  $rootScope.$on('$stateChangeStart', function (event, toState, toParams, fromState, fromParams) {
    $('body section').removeClass('dark-bg');
    if (!$sessionStorage.user && toState.name !== 'logon' && toState.name.lastIndexOf('admin') > -1) {
      event.preventDefault();
      $rootScope.$broadcast('user.logout');
      $state.transitionTo('logon');
    }
  });

  $rootScope.$state = $state;
  $rootScope.$stateParams = $stateParams;

  var origin = window.location.origin;

  $rootScope.isLocal = origin.search('localhost') > -1;

  // Point to resource -- see APIConf constant further below
  $rootScope.config = $rootScope.isLocal ? APIConf.local : APIConf.server;

  $rootScope.config.origin = origin;

  // If true will prepopulate input fields with test data, ie. user/pass etc
  $rootScope.devMode = $rootScope.isLocal ? true : false;

  // Override console.log in any environment apart from dev
  if ( !$rootScope.devMode ) {
    var console = {};
    console.log = function () {};
    window.console = console;
  }

})

.constant('APIConf', {

  local: {
    'basePath': '/api/v1',
    'messages': '/messages/coming-soon',
    'environment': '/messages/system-environment',
    'auth': '/sessions',
    'org': '/organisations',
    'users': '/users',

    'testData': {

      'user': 'Heath.Pritchard@london.gov.uk',
      'passwd': 'London.123',

      '_user': 'joe.doe@gla.com',
      '_passwd': 'qweqweqwe',

      register: {
        firstName: 'Joe',
        lastName: 'Doe',
        email: 'joe.doe@gla.com',
        phoneNumber: 7705123456,
        password: 'qweqweqwe',
        passwordConfirmation: 'qweqweqwe',
        imsNumber: 'L4241'
      }
    }
  },

  server: {
    'basePath': '/api/v1',
    'messages': '/messages/coming-soon',
    'environment': '/messages/system-environment',
    'auth': '/sessions',
    'org': '/organisations',
    'users': '/users',

    'testData': {
      'user': 'admin',
      'passwd': 'AB7ZQNFp4QCk4svt'
    }
  }

});

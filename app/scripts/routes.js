/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

'use strict';

angular.module('GLA').
config(['$stateProvider', '$urlRouterProvider', function ($stateProvider, $urlRouterProvider) {

  $urlRouterProvider.otherwise('/home');

  $stateProvider

    .state('home', {
    url: '/home',
    templateUrl: 'scripts/components/coming-soon/coming-soon.tpl.html',
    controller: 'CSoonCtrl',
    controllerAs: 'main'
  })

  .state('logon', {
    url: '/logon',
    templateUrl: 'scripts/components/log-on/log-on.tpl.html',
    controller: 'LogOnCtrl',
    controllerAs: 'logon'
  })

  .state('registration', {
    url: '/registration',
    templateUrl: 'scripts/components/registration/register.tpl.html',
    controller: 'RegisterCtrl',
    controllerAs: 'register'
  })

  .state('user', {
    url: '/user',
    templateUrl: 'scripts/components/user/user-home.tpl.html',
    controller: 'UserHomeCtrl',
    controllerAs: '$ctrl'
  })

  .state('user.programmes', {
    url: '/programmes',
    templateUrl: 'scripts/components/user/programmes/programmes.tpl.html',
    controller: 'ProgrammesCtrl',
    controllerAs: 'prog'
  })

  .state('user.projects', {
    url: '/projects',
    templateUrl: 'scripts/components/user/projects/projects.tpl.html',
    controller: 'ProjectsCtrl',
    controllerAs: 'proj'
  })

  .state('admin', {
    abstract: true,
    url: '/admin',
    templateUrl: 'scripts/components/admin/admin.tpl.html'
  })

  .state('admin.content', {
    url: '/content',
    templateUrl: 'scripts/components/admin/content/coming-soon-admin.tpl.html',
    controller: 'CSoonAdminCtrl',
    controllerAs: 'csoon'
  })

  .state('admin.organisations', {
    url: '/organisations/:filter',
    templateUrl: 'scripts/components/admin/organisations/organisations.tpl.html',
    controller: 'OrganisationsCtrl',
    controllerAs: 'org'
  })

  .state('admin.organisations.org', {
    url: '/:orgId',
    templateUrl: 'scripts/components/admin/organisations/org-details.tpl.html',
    controller: 'OrgDetailsCtrl',
    controllerAs: 'orgdetails'
  })


  /* Footer */

  .state('privacypolicy', {
      url: '/privacy',
      templateUrl: 'scripts/components/misc/privacy.tpl.html'
    })
    .state('termsandconditions', {
      url: '/tnc',
      templateUrl: 'scripts/components/misc/terms.tpl.html'
    })
    .state('accessibility', {
      url: '/accessibility',
      templateUrl: 'scripts/components/misc/accessibility.tpl.html'
    })

  }]);

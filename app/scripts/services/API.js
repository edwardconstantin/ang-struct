/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

'use strict'; // jshint ignore:line

angular.module('GLA')

.factory('API', ['$http', '$rootScope', '$injector', '$httpParamSerializerJQLike', function ($http, $rootScope, $injector, $httpParamSerializerJQLike) {

  var call = function (opt) {
    var cfg, res, url;
    res = opt.resuorce || $rootScope.config.origin + $rootScope.config.basePath;


    switch (opt.action) {
      // -----------------------------------------------------------------------
    case 'getMessage':

      url = res + $rootScope.config.messages
      cfg = {
        method: 'GET',
        url: url,
      };
      break;

      // -----------------------------------------------------------------------
    case 'getError':

      url = res + '/messages/npe'
      cfg = {
        method: 'GET',
        url: url,
      };
      break;

      // -----------------------------------------------------------------------
    case 'saveMessage':

      url = res + $rootScope.config.messages
      cfg = {
        method: 'PUT',
        url: url,
        data: opt.payload,
        serialize: false
      };
      break;

      // -----------------------------------------------------------------------
    case 'logOn':

      url = res + $rootScope.config.auth
      cfg = {
        method: 'POST',
        url: url,
        data: opt.payload,
        serialize: false
      };
      break;

      // -----------------------------------------------------------------------
    case 'logOut':
      var USER = $injector.get('USER');
      url = res + $rootScope.config.auth + '/' + USER.data.SID;
      cfg = {
        method: 'DELETE',
        url: url
      };
      break;

    // -----------------------------------------------------------------------
    case 'registerUser':
      var USER = $injector.get('USER');
      url = res + $rootScope.config.users
      cfg = {
        method: 'POST',
        url: url,
        data: opt.payload,
        serialize: false
      };
      break;

    // -----------------------------------------------------------------------
    case 'getEnvironment':

      url = res + $rootScope.config.environment;
      cfg = {
        method: 'GET',
        url: url
      };
      break;

      // -----------------------------------------------------------------------
      case 'getOrg':
      url = res + $rootScope.config.org+'/page';
      cfg = {
        method: 'GET',
        url: url,
        params: {
          page: opt.page,
          size: opt.size,
          sort: opt.sort,
        }
      };
      break;

      // -----------------------------------------------------------------------

    case 'getOrgDetails':
      url = res + $rootScope.config.org + '/' + opt.organisationId;
      cfg = {
        method: 'GET',
        url: url
      };
      break;

      // -----------------------------------------------------------------------

    case 'approveUser':
      url = res + $rootScope.config.users + '/' + opt.username + '/approved';
      cfg = {
        method: 'PUT',
        url: url,
        data: true
      };
      break;

    // -----------------------------------------------------------------------

    case 'getOrgNameByImsNumber':
      url = res + $rootScope.config.org + '/' + opt.imsNumber + '/name';
      cfg = {
        method: 'GET',
        url: url
      };
      break;

    // -----------------------------------------------------------------------
    }


    // Payload serialize on demand
    //if (cfg.serialize) cfg.data = $httpParamSerializerJQLike(cfg.data);

    // Finally, the API call -- returns a promise
    return $http(cfg)
      /*.then(

      // Call was succesful
      function successCallback(response) {
        //var _data = response.data;
        return response;
      },

      // Server error
      function errorCallback(response) {
        console.log(response);
      });*/
  };

  return {
    call: call
  };

}]);

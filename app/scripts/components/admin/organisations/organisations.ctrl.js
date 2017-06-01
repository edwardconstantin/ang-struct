/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */

'use strict';

angular.module('GLA')
  .controller('OrganisationsCtrl', ['$scope', '$rootScope', '$state', 'API', 'USER',
  function ($scope, $rootScope, $state, API, USER) {

    $scope.data = {};

    // Filter dropdown data
    $scope.data.dditems = [{
      id: 0,
      name: 'Show All'
    },{
      id: 1,
      name: 'Approved'
    },{
      id: 2,
      name: 'Pending'
    }];

    // current item
    $scope.data.dditem = $scope.data.dditems[0];

    $scope.filter = function(item) {
      console.log(item);
    };


    $scope.itemsPerPage = 50;
    //Current page starts by 1 in UI but by 0 in backend
    $scope.data.currentPage = 1;
    $scope.sortByName = 'name';
    $scope.sortReverse = false;

    $scope.pageChanged = function(pageNo) {
      getOrganisations();
    };

    $scope.displayPagination = function() {
      return $scope.totalItems > $scope.itemsPerPage;
    };

    // this is to prevent the organisations list to load when in the org details screen
    if ($state.current.name == 'admin.organisations') {
      getOrganisations();
    }

    $scope.getDetails = function ( id ) {
      $state.go( 'admin.organisations.org', { 'orgId': id });
    };

    $scope.sortBy = function(columnName) {
      $scope.sortReverse = ($scope.sortByName === columnName) ? !$scope.sortReverse : false;
      $scope.sortByName = columnName;
      $scope.data.currentPage = 1;

      // this is not an ideal, but angular doesn't update the active page number when we update the current page
      //$('.pagination .active').removeClass('active');
      //$('.pagination li:contains("1")').each(function() { $(this).addClass('active'); });

      getOrganisations();
    };

    function getOrganisations() {
      var sort = [$scope.sortByName+','+($scope.sortReverse ? 'desc' : 'asc')];
      if ($scope.sortByName != 'name') {
        sort.push('name,asc');
      }
      API.call({
        action: 'getOrg',
        page: $scope.data.currentPage - 1,
        size: $scope.itemsPerPage,
        sort: sort
      })
        .then(

        // Success
        function successCallback( response ) {
          if (!response) return;
          $scope.org = response.data.content;
          $scope.orgCollection = [].concat( $scope.org );

          $scope.totalItems = response.data.totalElements;
          //$scope.data.currentPage = response.data.number + 1;

          $scope.indexStart = ($scope.itemsPerPage * ($scope.data.currentPage - 1)) + 1;
          $scope.indexEnd = $scope.indexStart + response.data.numberOfElements - 1;

          //console.log( response );
        },

        // Error
        function errorCallback( error ) {
          console.error( error );
        }

      );
    }

  }]);

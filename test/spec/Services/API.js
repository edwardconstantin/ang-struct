/**
 * Copyright (c) Greater London Authority, 2016.
 *
 * This source code is licensed under the Open Government Licence 3.0.
 *
 * http://www.nationalarchives.gov.uk/doc/open-government-licence/version/3/
 */


/*describe('API Service Test', function(){

    beforeEach(module('GLA'));

    it('is defined', inject(function (API) {
      expect(API).toBeDefined();
    }))

    it('has "call" method', inject(function (API) {
      expect(API.call).toBeDefined();
    }))

});*/

describe('API', function () {
    var API, httpBackend;
    //2.
    beforeEach(function () {
        //3. load the module.
        angular.mock.module('GLA');

        // 4. get your service, also get $httpBackend
        // $httpBackend will be a mock.
        inject(function ($httpBackend, _API_) {
            API = _API_;
            httpBackend = $httpBackend;
        });
    });

    // 5. make sure no expectations were missed in your tests.
    afterEach(function () {
        httpBackend.verifyNoOutstandingExpectation();
        httpBackend.verifyNoOutstandingRequest();
    });

    //6.
   /* it('ServiceTestSpec', function () {

        var returnData = {};

        //7. expectGET to make sure this is called once.
        httpBackend.expectGET('http://localhost:8080/api/v1/messages/coming-soon').respond(returnData);

        //8. make the call.
        var returnedPromise = API.call({action: 'getMessage'});

        //9. set up a handler for the response, that will put the result
        // into a variable in this scope for you to test.
        var result;
        returnedPromise.then(function (response) {
            result = response.data;
        });

        //10. flush the backend to "execute" the request to do the expectedGET assertion.
        httpBackend.flush();

        //11. check the result.

        expect(result).toEqual(returnData);

    });
*/

});

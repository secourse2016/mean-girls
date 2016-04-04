
// var App = angular.module('alaska', ['ngRoute']);

/**
 * Angular Routes
 */

 var app = angular.module('alaska',['ngRoute']);


	app.config(function($routeProvider) {
    $routeProvider

      
        .when('/flight-info', {
        	templateUrl : '../views/flight-info.html',
            controller  : 'FlightInfoCtrl'

        })

        .when('/flights', {
            templateUrl : '../views/flights.html',
            controller  : 'FlightController'
        })
       
       .when('/passengerInfo', {
		  templateUrl: '../views/passengerInfo.html',
		  controller: 'SubmitCtr'
	  })

        .when('/payment', {
            templateUrl : '../views/payment.html',
            controller  : 'paymentCtrl'
        });



});




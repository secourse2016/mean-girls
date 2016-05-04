/**
* Angular Routes
*/

var app = angular.module('alaska',['ngRoute','ui.bootstrap']);

app.config(function($httpProvider,$routeProvider) {
	$routeProvider
	.when('/flight-info', {
		templateUrl : '../views/flight-status.html',
		controller  : 'flightInfoCtrl'
	})
	.when('/flights', {
		templateUrl : '../views/flights-new.html',
		controller  : 'flightsCtrl'
	})
	.when('/passenger-info', {
		templateUrl: '../views/passenger-info.html',
		controller: 'passengerCtrl'
	})
	.when('/payment', {
		templateUrl : '../views/payment-new.html',
		controller  : 'paymentCtrl'
	})
	.when('/booking', {
		templateUrl : 'views/booking.html',
		controller: 'bookingCtrl'
	})
	.when('/confirm',{
		templateUrl	: 'views/confirm.html',
		controller	:'confirmCtrl'
	})
	.when('/', {
		templateUrl : 'views/landing-new.html',
		controller  : 'landingCtrl'
	})
	//set stripe's public key
	Stripe.setPublishableKey('pk_test_I5BoepTFhbNEZbcMq5eUeSRg');



	var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBdXN0cmlhbiBBaXJsaW5lcyIsImlhdCI6MTQ2MDYzNTE1OCwiZXhwIjoxNDkyMTcxMTU4LCJhdWQiOiJ3d3cuYXVzdHJpYW4tYWlybGluZXMuY29tIiwic3ViIjoiYXVzdHJpYW5BaXJsaW5lcyJ9.Dilu6siLX3ouLk48rNASpYJcJSwKDTFYS2U4Na1M5k4';
	$httpProvider.interceptors.push(['$q', function ($q) {
		return {
			'request': function (config) {
				config.body = config.headers || {};
				config.headers['x-access-token'] = token;
				return config;
			},
			'responseError': function (response) {
				return $q.reject(response);
			}
		};
	}]);
});

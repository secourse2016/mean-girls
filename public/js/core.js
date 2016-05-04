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

	// Inject jwt token to all http requests
	var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBbGFza2EiLCJpYXQiOjE0NjEwNDY5NjcsImV4cCI6MTQ5MjU4Mjk3NCwiYXVkIjoiIiwic3ViIjoiIn0.dxB2Mx4-1W-cqfSeE9LC6QfMGvtLSLXduLrm0j7xzWM';
	$httpProvider.interceptors.push(['$q', '$location', function ($q, $location) {
		return {
			'request': function (config) {
				config.headers = config.headers || {};
				config.headers['x-access-token'] = token;
				return config;
			},
			'responseError': function (response) {
				if (response.status === 401 || response.status === 403) {
				}
				return $q.reject(response);
			}
		};
	}]);
	Stripe.setPublishableKey('pk_test_I5BoepTFhbNEZbcMq5eUeSRg');
});

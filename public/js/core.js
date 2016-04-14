/**
* Angular Routes
*/

var app = angular.module('alaska',['ngRoute']);


app.config(function($routeProvider) {
	$routeProvider
	.when('/flight-info', {
		templateUrl : '../views/flight-info.html',
		controller  : 'flightInfoCtrl'

	})

	.when('/flights', {
		templateUrl : '../views/flights.html',
		controller  : 'flightsCtrl'
	})

	.when('/passengerInfo', {
		templateUrl: '../views/passengerInfo.html',
		controller: 'submitCtrl'
	})

	.when('/payment', {
		templateUrl : '../views/payment.html',
		controller  : 'paymentCtrl'
	})
	.when('/resv/:id',{

		templateUrl: 'views/resv-info.html',
		controller: 'resvConfirmCtrl'
	})
	.when('/resv-show', {
		templateUrl : 'views/resv-show.html',
		controller: 'resvConfirmCtrl'
	})
	.when('/', {
		templateUrl : 'views/landing.html',
		controller  : 'landingCtrl'
	})



});

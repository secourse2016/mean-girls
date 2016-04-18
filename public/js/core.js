/**
* Angular Routes
*/

var app = angular.module('alaska',['ngRoute','ui.bootstrap']);


app.config(function($routeProvider) {
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
		controller: 'submitCtrl'
	})

	.when('/payment', {
		templateUrl : '../views/payment-new.html',
		controller  : 'paymentCtrl'
	})
	.when('/resv-show', {
		templateUrl : 'views/resv-show.html',
		controller: 'resvConfirmCtrl'
	})
	.when('/', {
		templateUrl : 'views/landing-new.html',
		controller  : 'landingCtrl'
	})



});

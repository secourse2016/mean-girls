// var App = angular.module('alaska', ['ngRoute']);

/**
 * Angular Routes
 */

 var app = angular.module('alaska','ngRoute']);


	app.config(function($routeProvider) {
    $routeProvider

        // route for the sherine page
        .when('/flights', {
            templateUrl : '/public/views/flights.html',
            controller  : 'FlightController'
        });
});
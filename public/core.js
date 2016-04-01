/* Create Angular App Instance */
App = angular.module('Alaska', []);

/**
 * Angular Routes
 */
App.config(function($routeProvider) {
    $routeProvider

        // route for the home page
        .when('/', {
            templateUrl : '/views/landing.html',
            controller  : 'landingCtrl'
        })

        // route for the booking info page
        .when('/booking-info', {
            templateUrl : '/views/booking-info.html',
            controller  : 'bookingInfoCtrl'
        });

         // route for the flight-info page
        .when('/flight-info', {
            templateUrl : '/views/flight-info.html',
            controller  : 'flightInfoCtrl'
        });

         // route for the flights page
        .when('/flights', {
            templateUrl : '/views/flights.html',
            controller  : 'flightsCtrl'
        });

         // route for the passenger-info page
        .when('/passenger-info', {
            templateUrl : '/views/passenger-info.html',
            controller  : 'passengerInfoCtrl'
        });

        // route for the payment page
        .when('/payment', {
            templateUrl : '/views/payment.html',
            controller  : 'paymentCtrl'
        });

           // route for the reservation info page
        .when('/resv-info', {
            templateUrl : '/views/resv-info.html',
            controller  : 'resvInfoCtrl'
        });


});
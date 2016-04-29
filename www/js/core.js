angular.module('alaskaIonic.routes', ['ionic','ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {
  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider

  .state('findFlights', {
    url: '/',
    views: {
      'findFlights': {
        templateUrl: './partials/findFlights.html'
        // controller: 'findFlightsCtrl'
      }
    }
  })

  .state('flightStatusSearch', {
    url: '/findFlightStatus',
    views: {
      'flightStatusSearch': {
      templateUrl: './partials/flightStatusSearch.html'
        // controller: 'flightStatusSearchCtrl'
      }
    }
  })

  .state('findBookingSearch', {
    url: '/findBooking',
    views: {
      'findBookingSearch': {
        templateUrl: './partials/findBookingSearch.html'
        // controller: 'findBookingSearchCtrl'
      }
    }
  })



  $urlRouterProvider.otherwise('/');

});
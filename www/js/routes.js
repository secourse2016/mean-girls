angular.module('alaskaIonic.routes', ['ionic','ionicUIRouter'])

.config(function($stateProvider, $urlRouterProvider) {

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.js
  $stateProvider
    
  

  .state('tabsController.findFlights', {
    url: '/findFlights',
    views: {
      'findFlights': {
        templateUrl: 'partials/findFlights.html',
        controller: 'findFlightsCtrl'
      }
    }
  })

  .state('tabsController.flightStatusSearch', {
    url: '/flightStatusSearch',
    views: {
      'flightStatusSearch': {
        templateUrl: 'partials/flightStatusSearch.html',
        // controller: 'flightStatusSearchCtrl'
      }
    }
  })

  .state('tabsController.findBookingSearch', {
    url: '/findBookingSearch',
    views: {
      'findBookingSearch': {
        templateUrl: 'partials/findBookingSearch.html',
        // controller: 'findBookingSearchCtrl'
      }
    }
  })

  .state('tabsController', {
    url: '/tab',
    templateUrl: 'partials/tabsController.html',
    abstract:true
  })

  .state('tabsController.findFlights.flights', {
    url: '/flights',
    views: {
      'findFlights@tabsController': {
        templateUrl: 'partials/flights.html',
        // controller: 'findBookingSearchCtrl'
      }
    }
  })

$urlRouterProvider.otherwise('/tab/findFlights')

  

});
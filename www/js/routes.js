app=angular.module('alaskaIonic.routes', ['ionic','ionicUIRouter','onezone-datepicker']);

app.config(function($stateProvider, $urlRouterProvider,$httpProvider) {


  $httpProvider.defaults.headers.common = {};
  $httpProvider.defaults.headers.post = {};
  $httpProvider.defaults.headers.put = {};
  $httpProvider.defaults.headers.patch = {};

  // Ionic uses AngularUI Router which uses the concept of states
  // Learn more here: https://github.com/angular-ui/ui-router
  // Set up the various states which the app can be in.
  // Each state's controller can be found in controllers.j

  $stateProvider
  .state('tabsController.findBookingSearch', {
    url: '/findBookingSearch',
    views: {
      'findBookingSearch': {
        templateUrl: 'partials/findBookingSearch.html',
        controller: 'findBookingSearchCtrl'

      }
    }
  })
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
        templateUrl: 'partials/flightStatusSearch.html'
        // controller: 'flightStatusSearchCtrl'
      }
    }
  })


  .state('tabsController.findBookingSearch.viewBooking', {
    url: '/viewBooking',
    views: {
      'findBookingSearch@tabsController': {
        templateUrl: 'partials/viewBooking.html',
         controller: 'bookingCtrl'

      }
    }
  })

  .state('tabsController.findFlights.flights.passengerInfo.payment.confirmation', {
    url: '/viewBooking',
    views: {
      'findFlights@tabsController': {
        templateUrl: 'partials/confirmation.html',
         controller: 'confirmCtrl'

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
        controller: 'flightsCtrl'
      }
    }
  })

  .state('tabsController.findFlights.flights.passengerInfo', {
    url: '/passengerInfo',
    views: {
      'findFlights@tabsController': {
        templateUrl: 'partials/passengerInfo.html',
        controller: 'passengerCtrl'

      }
    }
  })
  
  .state('tabsController.findFlights.flights.passengerInfo.payment', {
    url: '/payment',
    views: {
      'findFlights@tabsController': {

        templateUrl: 'partials/payment.html',
        controller: 'paymentCtrl'

      }
    }
  })

$urlRouterProvider.otherwise('/tab/findFlights');




});


app=angular.module('alaskaIonic.routes', ['ionic','ionicUIRouter','onezone-datepicker']);

app.config(function($stateProvider, $urlRouterProvider,$httpProvider) {


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

  //Inject jwt token to all http requests
  // var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBbGFza2EiLCJpYXQiOjE0NjEwNDY5NjcsImV4cCI6MTQ5MjU4Mjk3NCwiYXVkIjoiIiwic3ViIjoiIn0.dxB2Mx4-1W-cqfSeE9LC6QfMGvtLSLXduLrm0j7xzWM';
  // $httpProvider.interceptors.push(['$q', '$location', function ($q, $state) {
  //   return {
  //     'request': function (config) {
  //       config.headers = config.headers || {};
  //       config.headers['x-access-token'] = token;
  //       return config;
  //     },
  //     'responseError': function (response) {
  //       if (response.status === 401 || response.status === 403) {
  //       }
  //       return $q.reject(response);
  //     }
  //   };
  // }]); 
});
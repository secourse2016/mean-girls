<<<<<<< HEAD
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
=======
<<<<<<< HEAD
=======

// var app = angular.module('alaska',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider.when('/passengerInfo',{

		templateUrl: '/views/passengerInfo.html',
		controller: 'SubmitCtr'
	}
)});


>>>>>>> dd688c3609d279244bf2b607dc9230e09ded676d
  // var app = angular.module('alaska',['ngRoute']);
 



app.config(function($routeProvider) {
    $routeProvider

        
        .when('/payment', {
            templateUrl : 'public/views/payment.html',
            controller  : 'paymentCtrl'
        });
});

>>>>>>> fcfecf015215a11d4c01d63283236ea061d8d65f

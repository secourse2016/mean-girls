<<<<<<< HEAD
=======

var app = angular.module('alaska',['ngRoute']);

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


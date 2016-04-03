
var app = angular.module('alaska',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider.when('/passengerInfo',{

		templateUrl: '/views/passengerInfo.html',
		controller: 'SubmitCtr'
	}
)});


  var app = angular.module('alaska',['ngRoute']);
 



app.config(function($routeProvider) {
    $routeProvider

        
        .when('/payment', {
            templateUrl : 'public/views/payment.html',
            controller  : 'paymentCtrl'
        });
});


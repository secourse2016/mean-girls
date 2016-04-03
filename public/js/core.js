var app = angular.module('alaska',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/', {
            templateUrl : 'views/landing.html',
            controller  : 'landingCtrl'
    })

	.when('/resv/:id',{

		templateUrl: 'views/resv-info.html',
		controller: 'ResvShowController'
	})

    .when('/flights', {
    	templateUrl : 'views/flights.html',
	});



});

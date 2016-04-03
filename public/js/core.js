var app = angular.module('alaska',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider
	.when('/resv/:id',{

		templateUrl: 'views/resv-info.html',
		controller: 'ResvShowController'
	})

	.when('/', {
            templateUrl : '/views/landing.html',
            controller  : 'landingCtrl'
    })

    .when('/flights', {
    	templateUrl : '/views/flights.html',
	});



});

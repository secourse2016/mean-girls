var app = angular.module('airline',['ngRoute']);

app.config(function($routeProvider, $locationProvider){
	$routeProvider.when('/resv',{

		templateUrl: 'views/resv-info.html'
	}
	)});

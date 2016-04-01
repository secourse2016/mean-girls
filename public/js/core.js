var app = angular.module('Airline',['ngRoute']);

app.config(function($routeProvider){
	$routeProvider.when('/resv',{
		templateUrl: './views/resv-info.html'
	})
});
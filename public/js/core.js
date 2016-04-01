var app = angular.module('airline',['ngRoute']);

app.config(function($routeProvider, $locationProvider){
	$routeProvider.when('/resv/:id',{

		templateUrl: 'views/resv-info.html',
		controller: 'resvInfoController',
		controllerAs : 'resvController'
	}
	)});

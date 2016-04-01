var app = angular.module('alaska',['ngRoute']);

app.config(function($routeProvider, $locationProvider){
	$routeProvider.when('/resv/:id',{

		templateUrl: 'views/resv-info.html',
		controller: 'resvInfoController',
		controllerAs : 'resvController'
	}
	)});

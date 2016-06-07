angular.module('alaska')
.controller("bookingCtrl", function($scope,$routeParams,bookingSrvc,masterSrvc){

	$scope.booking=bookingSrvc.booking;

	$scope.getAirportName=function(iata){
		var airports=masterSrvc.airports;
		for (var i = 0; i < airports.length; i++) {
			if(iata===airports[i].iata)
			return airports[i].name;
		}
	}
});

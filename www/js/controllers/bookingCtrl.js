angular.module('alaskaIonic')
.controller("bookingCtrl", function($scope,$routeParams,bookingSrvc){
	bookingSrvc.getBooking(function(booking){
		$scope.booking=booking;
	});
	$scope.getAirportName=function(iata){
		var airports=masterSrvc.airports;
		for (var i = 0; i < airports.length; i++) {
			if(iata===airports[i].iata)
				return airports[i].name;
		}
	}
});
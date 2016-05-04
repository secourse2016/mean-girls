angular.module('alaskaIonic')
.controller("bookingCtrl", function($scope,bookingSrvc,masterSrvc){
	bookingSrvc.getBooking(function(booking){
		$scope.booking=booking;
		// console.log("here"+$scope.booking);
	});
	$scope.getAirportName=function(iata){
		var airports=masterSrvc.airports;
		for (var i = 0; i < airports.length; i++) {
			if(iata===airports[i].iata)
				return airports[i].name;
		}
	}

});


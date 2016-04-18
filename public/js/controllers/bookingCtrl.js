angular.module('alaska')
.controller("bookingCtrl", function($scope,$routeParams,bookingSrvc){
	bookingSrvc.getBooking(function(booking){
		$scope.booking=booking;
	});
});

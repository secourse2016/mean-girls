angular.module('alaska').controller('landingCtrl', function ($scope,landingSrvc,$location,$http){
	$http.get('dummyData/airports.json').success(function(data) {
		$scope.airports = data;
	});

	$scope.form={};
	$scope.form.class = "Economy";
	$scope.form.fromCountry="IAD";
	$scope.form.toCountry="IAD";


	$scope.findFlightsButtonClick = function() {
		landingSrvc.setFindFlightInfo($scope.form);

		$location.url('/flights');


	};
	$scope.showBooking = function() {

		$location.url('/resv/'+ $scope.bookingRef);


	};
	$scope.checkFlight = function() {

		$location.url('/flight-info');


	};

	$scope.notNull = function (airport){
		return airport.name != null;
	}






	



});

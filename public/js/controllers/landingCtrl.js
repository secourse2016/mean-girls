angular.module('alaska').controller('landingCtrl',function ($scope,landingSrvc,$location,$http){
	$http.get('dummyData/airports.json').success(function(data) {
		$scope.airports = data;
	});

	$scope.form={};



	$scope.findFlights = function() {
		landingSrvc.setFindFlightInfo($scope.form);

		$location.url('/flights');


	};
	$scope.showBooking = function() {
		$location.url('/resv-show');

	};
	$scope.checkFlight = function() {

		$location.url('/flight-info');


	};

	$scope.notNull = function (airport){
		return airport.name != null;
	}
















});

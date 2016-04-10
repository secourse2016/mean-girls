angular.module('alaska').controller('landingCtrl', function ($scope,landingSrv,$location,$http){

	$http.get('dummyData/airports.json').success(function(data) {
		    $scope.airports = data;
	});

	$scope.submitted=false;
	$scope.form={};
	$scope.form.class = "Economy";
	$scope.form.fromCountry="HDF";
	$scope.form.toCountry="HDF";

	$scope.findFlightsButtonClick = function() {
		landingSrv.setFindFlightInfo($scope.form);

		$location.url('/flights');
	

 	};

 	$scope.notNull = function (airport){
 		return airport.name != null;
 	}


});
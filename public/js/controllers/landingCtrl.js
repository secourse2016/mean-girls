angular.module('alaska').controller('landingCtrl', function ($scope,landingSrvc,$location,$http){

	$http.get('dummyData/airports.json').success(function(data) {
		    $scope.airports = data;
	});
	$scope.submitted=false;
	$scope.form={};
	$scope.form.class = "Economy";

	$scope.findFlightsButtonClick = function() {
		landingSrvc.setFindFlightInfo($scope.form);

		$location.url('/flights');


 	};

 	$scope.notNull = function (airport){
 		return airport.name != null;
 	}


});

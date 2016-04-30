angular.module('alaskaIonic').controller('findFlightsCtrl',function ($scope,$state){

	$scope.airports=[
    {
        "iata": "HDF",
        "lon": "14.138242",
        "iso": "DE",
        "status": 1,
        "name": "Heringsdorf Airport",
        "continent": "EU",
        "type": "airport",
        "lat": "53.87825",
        "size": "medium"
    },
    {
        "iata": "BBH",
        "lon": "12.711667",
        "iso": "DE",
        "status": 1,
        "name": "Barth Airport",
        "continent": "EU",
        "type": "airport",
        "lat": "54.33972",
        "size": "small"
    }];


	$scope.findFlights = function() {
		alert("working hello");
		var origin= $scope.origin;
		var destination= $scope.destination;
		var departingDate=new Date($scope.departingDate).getTime();
		console.log($scope.departingDate);
		var seatClass= $scope.class;
		var otherAirlines=$scope.otherAirlines;
		var oneWay=$scope.oneWay;

		console.log("one way"+oneWay);
		console.log(oneWay+ " "+destination+ " "+departingDate+ " "+seatClass+ " "+otherAirlines+ " "+oneWay);
		$state.go('flights');

	};


	$scope.notNull = function (airport){
		return airport.name != null;
	};

});

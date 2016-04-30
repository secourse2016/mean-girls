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
		var origin= $scope.origin;
		var destination= $scope.destination;
		var departingDate=new Date($scope.departingDate).getTime();
		// console.log($scope.departingDate);
		var seatClass= $scope.class;
		var otherAirlines=$scope.otherAirlines;
		var oneWay=$scope.oneWay;
        
        if(oneWay===0){
            var returnDate=new Date($scope.returningDate).getTime();
        }
        
		// console.log("one way:"+oneWay);
        // console.log("destination:"+destination);
        // console.log("departingDate:"+departingDate);
        // console.log("seatClass:"+seatClass);
        // console.log("otherAirlines:"+otherAirlines);
        // console.log("origin:"+origin);
		// console.log(oneWay+ " "+destination+ " "+departingDate+ " "+seatClass+ " "+otherAirlines+ " "+oneWay);
		$state.go('tabsController.findFlights.flights');

	};


	$scope.notNull = function (airport){
		return airport.name != null;
	};

});

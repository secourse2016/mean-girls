angular.module('alaska').controller('landingCtrl', function ($scope,landingSrv,$location,$http){
	$scope.formInfo=[];



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


	$scope.findFlightsButtonClick = function(form) {
		$scope.formInfo=form;

		landingSrv.setFindFlightInfo(form);

		$location.path('/flights');
		$scope.apply();
 	};


});
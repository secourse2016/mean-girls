
angular.module('alaska').
controller('flightInfoCtrl',function($scope, $http,flightInfoSrvc,masterSrvc){
  $scope.flight=flightInfoSrvc.flight;
  var departure=new Date(flightInfoSrvc.flight.departureDateTime);
  var arrival=new Date(flightInfoSrvc.flight.arrivalDateTime);
  var now=new Date();
  if(departure<now){
    $scope.status="scheduled";
  }
  else{
    if(arrival<now)
    $scope.status="departed";
    else {
      $scope.status="arrived"
    }
  }
  $scope.getAirportName=function(iata){
		var airports=masterSrvc.airports;
		for (var i = 0; i < airports.length; i++) {
			if(iata===airports[i].iata)
				return airports[i].name;
		}
	}
});

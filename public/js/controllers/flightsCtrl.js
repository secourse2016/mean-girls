
angular.module('alaska').
controller('flightsCtrl',function($scope, $http,$location ,landingSrvc){
	$scope.outFlights =[];
	$scope.retFlights =[];
	var targetFlight = landingSrvc.getFindFlightInfo();
	$scope.oneway = targetFlight.oneway;
	$http.get('dummyData/flights.json').success(function(flights){
		for (var i = 0; i < flights.length; i++) {
			if(flights[i].origin == targetFlight.fromCountry
				&& flights[i].destination == targetFlight.toCountry){
					$scope.outFlights.push(flights[i]);
				}
			}

			if(!targetFlight.oneway){
				for (var i = 0; i < flights.length; i++) {
					if(flights[i].origin == targetFlight.toCountry
						&& flights[i].destination == targetFlight.fromCountry){
							$scope.retFlights.push(flights[i]);
						}
					}
				}
			});

			$scope.infoFlightNo = { index: null };
			$scope.infoFlightNo1 = { index: null };
			$scope.Continue = function (){
				$location.url('/passengerInfo');
			}

		});

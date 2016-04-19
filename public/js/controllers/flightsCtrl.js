
angular.module('alaska').
controller('flightsCtrl',function($scope, $http,$location ,flightsSrvc,masterSrvc){
	$scope.parseInt = parseInt;
	$scope.outgoingFlights =angular.copy(flightsSrvc.outgoingFlights);
	$scope.returnFlights =angular.copy(flightsSrvc.returnFlights);
	var oneWay= flightsSrvc.oneWay;
	$scope.oneWay = oneWay;
	$scope.otherAirlines=flightsSrvc.otherAirlines;
	$scope.origin=flightsSrvc.origin;
	$scope.destination=flightsSrvc.destination;
	$scope.seatClass=flightsSrvc.seatClass;
	// $scope.selectedOutgoing=$scope.outgoingFlights[$scope.selectedOutgoing.index-1];
	// if(oneWay!==1)
	// $scope.selectedReturn=$scope.returnFlights[$scope.selectedReturn.index-1];


	$scope.Continue = function (){

		masterSrvc.oneWay=flightsSrvc.oneWay;
		masterSrvc.seatClass=flightsSrvc.seatClass;

		masterSrvc.outgoingFlight=angular.copy($scope.outgoingFlights[$scope.selectedOutgoing]);
		console.log("scope's" + $scope.outgoingFlights[$scope.selectedOutgoing]);
		var oneWay=$scope.oneWay;
		var total=$scope.outgoingFlights[$scope.selectedOutgoing].cost;

		if(oneWay!==1){
			masterSrvc.returnFlight=angular.copy($scope.returnFlights[$scope.selectedReturn]);
			total+=$scope.returnFlights[$scope.selectedReturn].cost;
		}

		masterSrvc.amount=total;

		$location.url('/passenger-info');
	}

});

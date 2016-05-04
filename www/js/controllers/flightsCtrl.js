angular.module('alaskaIonic').
controller('flightsCtrl',function($scope, $http,$state ,flightsSrvc,masterSrvc){
	$scope.outgoingFlights =angular.copy(flightsSrvc.outgoingFlights);
	$scope.returnFlights =angular.copy(flightsSrvc.returnFlights);

	var oneWay= $scope.oneWay = flightsSrvc.oneWay;
	$scope.otherAirlines=flightsSrvc.otherAirlines;
	$scope.selectedOutgoing={index:null};
	$scope.selectedReturn={index:null};
	$scope.origin=flightsSrvc.origin;
	$scope.destination=flightsSrvc.destination;
	$scope.seatClass=flightsSrvc.seatClass;

	$scope.Continue = function (){

		masterSrvc.oneWay=flightsSrvc.oneWay;
		masterSrvc.seatClass=flightsSrvc.seatClass;

		masterSrvc.outgoingFlight=angular.copy($scope.outgoingFlights[$scope.selectedOutgoing.index]);
		var oneWay=$scope.oneWay;
		var total=Number($scope.outgoingFlights[$scope.selectedOutgoing.index].cost);

		if(oneWay!==1){
			masterSrvc.returnFlight=angular.copy($scope.returnFlights[$scope.selectedReturn.index]);
			// console.log(masterSrvc.returnFlight);
			total+=Number($scope.returnFlights[$scope.selectedReturn.index].cost);
		}

		masterSrvc.amount=total;

		$state.go('tabsController.findFlights.flights.passengerInfo');
	}



});


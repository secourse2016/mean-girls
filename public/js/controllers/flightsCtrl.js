
angular.module('alaska').
controller('flightsCtrl',function($scope, $http,$location ,flightsSrvc){
	$scope.outgoingFlights =angular.copy(flightsSrvc.outgoingFlights);
	$scope.returnFlights =angular.copy(flightsSrvc.returnFlights);

	var oneWay= $scope.oneWay = flightsSrvc.oneWay;
	$scope.otherAirlines=flightsSrvc.otherAirlines;
	$scope.selectedOutgoing={index:null};
	$scope.selectedReturn={index:null};
	$scope.origin=flightsSrvc.origin;
	$scope.destination=flightsSrvc.destination;
	$scope.seatClass=flightsSrvc.seatClass;
	//get time from dateTime of flights
	//outgoingFlights
	for(i = 0; i < $scope.outgoingFlights.length; i++){
		var departureTime = new Date($scope.outgoingFlights[i].departureDateTime);
		$scope.outgoingFlights[i].departureTime = departureTime.getHours()+':'+departureTime.getMinutes();

		var arrivalTime = new Date($scope.outgoingFlights[i].arrivalDateTime);
		$scope.outgoingFlights[i].arrivalTime   = arrivalTime.getHours()+':'+arrivalTime.getMinutes();
	}
	//returnFlights
	if(oneWay!==1){
		for(i = 0; i < $scope.returnFlights.length; i++){
			var departureTime = new Date($scope.returnFlights[i].departureDateTime);
			$scope.returnFlights[i].departureTime = departureTime.getHours()+':'+departureTime.getMinutes();

			var arrivalTime = new Date($scope.returnFlights[i].arrivalDateTime);
			$scope.returnFlights[i].arrivalTime   = arrivalTime.getHours()+':'+arrivalTime.getMinutes();
		}
	}

	// $scope.Continue = function (){

	// 	masterSrvc.oneWay=flightsSrvc.oneWay;
	// 	masterSrvc.seatClass=flightsSrvc.seatClass;

	// 	var selectedOutgoing=$scope.outgoingFlights[$scope.selectedOutgoing.index];
	// 	masterSrvc.outgoingFlight=selectedOutgoing;

	// 	var oneWay=$scope.oneWay;
	// 	var total=$scope.selectedOutgoing.cost;

	// 	if(oneWay!==1){
	// 		var selectedOutgoing=$scope.returnFlights[$scope.selectedReturn.index];
	// 		masterSrvc.returnFlight=selectedReturn;
	// 		total+=$scope.selectedReturn.cost;
	// 	}

	// 	masterSrvc.payment.amount=total;

	// 	$location.url('/passenger-info');
	// }

});

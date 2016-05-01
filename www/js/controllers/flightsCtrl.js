angular.module('alaskaIonic').controller('flightsCtrl',function ($scope,$state,flightsSrvc){
	// $scope.outgoingFlights=flightSrvc.getFindFlightInfo();

	$scope.outgoingFlights= [{ "flightNumber" : "SE280472",
	  "aircraftModel" : "a318",
	  "aircraftType" : "Airbus",
	  "capacity" : 60,
	  "duration" : "2 hours",
	  "origin" : "BOM",
	  "destination" : "DEL",
	  "economyCost" : "150",
	  "businessCost" : "300",
	  "availableSeats" : 60,
	  "availableEconomySeats" : 20,
	  "availableBusinessSeats" : 40,
	  "departureDateTime" : "2016-04-14 12:25 AM",
	  "arrivalDateTime" : "2016-04-14 03:25 PM",
	  "seatmap" : [ { "seatNumber" : "A1", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A2", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A3", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A4", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A5", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A6", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A7", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A8", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A9", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A10", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B1", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B2", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B3", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B4", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B5", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B6", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B7", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B8", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B9", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B10", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "C1", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C2", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C3", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C4", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C5", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C6", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C7", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C8", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C9", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C10", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D1", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D2", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D3", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D4", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D5", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D6", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D7", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D8", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D9", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D10", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E1", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E2", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E3", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E4", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E5", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E6", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E7", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E8", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E9", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E10", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F1", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F2", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F3", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F4", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F5", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F6", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F7", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F8", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F9", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F10", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null } ] 
	}];

});


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

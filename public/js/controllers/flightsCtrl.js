angular.module('alaska').
controller('flightsCtrl',function($scope, $http,$location ,flightsSrvc,masterSrvc,$uibModal,modalSrvc){
	$scope.parseInt = parseInt;
	$scope.outgoingFlights =angular.copy(flightsSrvc.outgoingFlights);
	$scope.returnFlights =angular.copy(flightsSrvc.returnFlights);
	var oneWay= flightsSrvc.oneWay;
	$scope.oneWay = oneWay;
	$scope.otherAirlines=flightsSrvc.otherAirlines;
	$scope.origin=flightsSrvc.origin;
	$scope.destination=flightsSrvc.destination;
	$scope.seatClass=flightsSrvc.seatClass;
	$scope.price = 0;

	function cost (arr, index){
		if(index !== undefined){
			return parseInt(arr[index].cost);
		}
		else {
			return 0;
		}
	}
	$scope.selectFlight = function(){
		if(oneWay)
		{
			$scope.price = cost($scope.outgoingFlights,$scope.selectedOutgoing);
		}
		else {
			$scope.price = cost($scope.outgoingFlights,$scope.selectedOutgoing) + cost($scope.returnFlights,$scope.selectedReturn);
		}
	}

	$scope.openModal= function(message){
		modalSrvc.modalMessage = message;
		var modalInstance = $uibModal.open({
			templateUrl: 'myModalContent.html',
			controller: 'ModalInstanceCtrl'
		});
	}

	$scope.Continue = function (){
		if($scope.selectedOutgoing === undefined){
			$scope.openModal("Please select your flight(s).");
			return;
		}

		masterSrvc.oneWay=flightsSrvc.oneWay;
		masterSrvc.seatClass=flightsSrvc.seatClass;

		masterSrvc.outgoingFlight=angular.copy($scope.outgoingFlights[$scope.selectedOutgoing]);
		var oneWay=$scope.oneWay;
		var total=$scope.outgoingFlights[$scope.selectedOutgoing].cost;

		if(oneWay!==1){
			if($scope.selectedReturn === undefined){
				$scope.openModal("Please select your flight(s).");
				return;
			}
			masterSrvc.returnFlight=angular.copy($scope.returnFlights[$scope.selectedReturn]);
			total+=$scope.returnFlights[$scope.selectedReturn].cost;
		}

		masterSrvc.amount=total;

		$location.url('/passenger-info');
	}

});

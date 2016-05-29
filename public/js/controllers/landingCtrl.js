
angular.module('alaska').controller('landingCtrl',function ($scope,$location,$http,masterSrvc,flightsSrvc,bookingSrvc,flightInfoSrvc, $uibModal,modalSrvc){
	$scope.clicked=false;

	$http.get('/api/airports').success(function(data) {
		$scope.airports = data;
		masterSrvc.airports=data;
	});

	$scope.findFlights = function() {
		/*bind data*/
		var origin= $scope.origin;
		var destination= $scope.destination;
		var departingDate=new Date($scope.departingDate).getTime();
		var seatClass= $scope.class;
		var otherAirlines=$scope.otherAirlines;
		var oneWay=$scope.oneWay;

		/* set service variables*/
		flightsSrvc.oneWay=oneWay
		flightsSrvc.otherAirlines=otherAirlines;
		flightsSrvc.seatClass=seatClass;
		flightsSrvc.origin=origin;
		flightsSrvc.destination=destination;

		flightsSrvc.outgoingFlights=[];
		flightsSrvc.returnFlights=[];

		/*one way trip*/
		if(oneWay===1){
			//TODO add 1 for seat parameter to API calls
			$http.get('/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+seatClass+'/'+1).success(function(flights){
				flightsSrvc.outgoingFlights=flightsSrvc.outgoingFlights.concat(flights.outgoingFlights);
				if(otherAirlines===1){
					$http.get('/api/other/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+seatClass+'/'+1).success(function(othersFlights){
						flightsSrvc.outgoingFlights=flightsSrvc.outgoingFlights.concat(othersFlights.outgoingFlights);
						if(flightsSrvc.outgoingFlights.length===0){
							$scope.openModal("We couldn't find the desired flight(s).");
						}
						else{
							$location.url('/flights');
						}
					});
				}
				else{
					if(flightsSrvc.outgoingFlights.length===0){
						$scope.openModal("We couldn't find the desired flight(s).");
					}
					else{
						$location.url('/flights');
					}
				}
			});
		}
		/*round trip*/
		else{
			var returningDate=new Date($scope.returningDate).getTime();
			$http.get('/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+returningDate+'/'+seatClass+'/'+1).success(function(flights){
				flightsSrvc.outgoingFlights=flightsSrvc.outgoingFlights.concat(flights.outgoingFlights);
				flightsSrvc.returnFlights=flightsSrvc.returnFlights.concat(flights.returnFlights);
				if(otherAirlines===1){
					$http.get('/api/other/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+returningDate+'/'+seatClass+'/'+1).success(function(othersFlights){
						flightsSrvc.outgoingFlights=flightsSrvc.outgoingFlights.concat(othersFlights.outgoingFlights);
						flightsSrvc.returnFlights=flightsSrvc.returnFlights.concat(othersFlights.returnFlights);
						if(flightsSrvc.outgoingFlights.length===0 || flightsSrvc.returnFlights.length===0){
							$scope.openModal("We couldn't find the desired flight(s).");
						}
						else{
							$location.url('/flights');
						}
					});
				}
				else{
					if(flightsSrvc.outgoingFlights.length===0 || flightsSrvc.returnFlights.length===0){
						$scope.openModal("We couldn't find the desired flight(s).");
					}
					else{
						$location.url('/flights');
					}
				}
			}).error(function(err){console.log(err);});
		}


	};

	$scope.showBooking = function() {
		var bookingRef=$scope.bookingRef;
		if(!bookingRef){
			$scope.openModal("Please fill in a booking reference.");
			return;
		}
		$http.get('/api/booking/'+bookingRef).success(function(booking){
			if(!booking){
				$scope.openModal("We couldn't find that booking.");
				return;
			}
			bookingSrvc.booking=booking;
			$location.url('/booking');
		});
	};
	$scope.checkFlight = function() {
		var flightNo=$scope.flightNo;
		if(!flightNo){
			$scope.openModal("Please fill in a flight number.");
			return;
		}
		$http.get('/api/flight/'+flightNo).success(function(flight){
			if(!flight){
				$scope.openModal("We couldn't find that flight.");
				return;
			}
			flightInfoSrvc.flight=angular.copy(flight);
			$location.url('/flight-info');
		});
	};

	$scope.notNull = function (airport){
		return airport.name != null;
	}
	$scope.validateForm =  function(){

		if($scope.searchForm.$valid){
			return true;
		}
		else{
			$scope.clicked=true;
			return false;
		}

	};

	$scope.openModal= function(message){
		modalSrvc.modalMessage = message;
		var modalInstance = $uibModal.open({
			templateUrl: 'myModalContent.html',
			controller: 'ModalInstanceCtrl'
		});
	}

});
angular.module('alaska').factory('modalSrvc',function(){
	this.modalMessage="";
	return{

	}
});

angular.module('alaska').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance,modalSrvc) {

	$scope.modalMessage=modalSrvc.modalMessage;
	$scope.ok = function () {
		$uibModalInstance.close();
	};

});

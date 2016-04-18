angular.module('alaska').controller('landingCtrl',function ($scope,,$location,$http,flightsSrvc,bookingSrvc,flightInfoSrvc){

	$http.get('/api/airports').success(function(data) {
		$scope.airports = data;
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

		/*one way trip*/
		if(oneWay===1){
			$http.get('/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+seatClass).success(function(flights){
				flightsSrvc.outgoingFlights.push(angular.copy(flights));
				if(otherAirlines===1){
					$http.get('/api/other/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+seatClass).success(function(othersFlights){
						flightsSrvc.outgoingFlights.push(angular.copy(othersFlights.outgoingFlights));
						$location.url('/flights');
					});
				}
				else{
					$location.url('/flights');
				}
			});
		}
		/*round trip*/
		else{
			var returningDate=new Date($scope.returningDate).getTime();
			$http.get('/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+returningDate+'/'+seatClass).success(function(flights){
				flightsSrvc.outgoingFlights.push(angular.copy(flights.outgoingFlights));
				flightsSrvc.returnFlights.push(angular.copy(flights.returnFlights));
				if(otherAirlines===1){
					$http.get('/api/other/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+returningDate+'/'+seatClass).success(function(othersFlights){
						flightsSrvc.outgoingFlights.push(angular.copy(othersFlights.outgoingFlights));
						flightsSrvc.returnFlights.push(angular.copy(othersFlights.returnFlights));
						$location.url('/flights');
					});
				}
				else{
					$location.url('/flights');
				}
			});
		}


	};

	$scope.showBooking = function() {
		var bookingRef=$scope.bookingRef;
		$http.get('/api/booking/'+bookingRef).success(function(booking){
			bookingSrvc.booking=angular.copy(booking);
			$location.url('/booking');
		});
	};
	$scope.checkFlight = function() {
		var flightNo=$scope.flightNo;
		$http.get('/api/flight/'+flightNo).success(function(flight){
			flightInfoSrvc.flight=angular.copy(flight);
			$location.url('/flight-info');
		});
	};

	$scope.notNull = function (airport){
		return airport.name != null;
	}

});

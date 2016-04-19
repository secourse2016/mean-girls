
angular.module('alaska').controller('landingCtrl',function ($scope,$location,$http,masterSrvc,flightsSrvc,bookingSrvc,flightInfoSrvc){

	$http.get('/api/airports').success(function(data) {
		$scope.airports = data;
		masterSrvc.airports=data;
	});

	$scope.findFlights = function() {
		/*bind data*/
		var origin= $scope.origin;
		var destination= $scope.destination;
		var departingDate=new Date($scope.departingDate).getTime();
		console.log($scope.departingDate);
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
			$http.get('/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+seatClass).success(function(flights){
				flightsSrvc.outgoingFlights.concat(flights);
				if(otherAirlines===1){
					$http.get('/api/other/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+seatClass).success(function(othersFlights){
						flightsSrvc.outgoingFlights.concat(othersFlights.outgoingFlights);
						if(flightsSrvc.outgoingFlights.length===0){
							flightsSrvc.foundFlights=0;
						}
						$location.url('/flights');
					});
				}
				else{
					if(flightsSrvc.outgoingFlights.length===0){
						flightsSrvc.foundFlights=0;
					}
					$location.url('/flights');
				}
			});
		}
		/*round trip*/
		else{
			var returningDate=new Date($scope.returningDate).getTime();
			console.log('/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+returningDate+'/'+seatClass);
			$http.get('/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+returningDate+'/'+seatClass).success(function(flights){
				flightsSrvc.outgoingFlights.concat(flights.outgoingFlights);
				flightsSrvc.returnFlights.concat(flights.returnFlights);
				if(otherAirlines===1){
					$http.get('/api/other/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+returningDate+'/'+seatClass).success(function(othersFlights){
						flightsSrvc.outgoingFlights.concat(othersFlights.outgoingFlights);
						flightsSrvc.returnFlights.concat(othersFlights.returnFlights);
						$location.url('/flights');
						if(flightsSrvc.outgoingFlights.length===0 || flightsSrvc.returnFlights.length===0){
							flightsSrvc.foundFlights=0;
						}
					});
				}
				else{
					if(flightsSrvc.outgoingFlights.length===0 || flightsSrvc.returnFlights.length===0){
						flightsSrvc.foundFlights=0;
					}
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
		}).error(function(err){
			console.log(err);
		});
	};

	$scope.notNull = function (airport){
		return airport.name != null;
	}

});

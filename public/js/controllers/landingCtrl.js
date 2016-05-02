
angular.module('alaska').controller('landingCtrl',function ($scope,$location,$http,masterSrvc,flightsSrvc,bookingSrvc,flightInfoSrvc){
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
				flightsSrvc.outgoingFlights=flightsSrvc.outgoingFlights.concat(flights.outgoingFlights);
				console.log("HAI"+flightsSrvc.outgoingFlights);
				if(otherAirlines===1){
					$http.get('/api/other/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+seatClass).success(function(othersFlights){
						flightsSrvc.outgoingFlights=flightsSrvc.outgoingFlights.concat(flights.outgoingFlights);
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
				flightsSrvc.outgoingFlights=flightsSrvc.outgoingFlights.concat(flights.outgoingFlights);
				flightsSrvc.returnFlights=flightsSrvc.returnFlights.concat(flights.returnFlights);
				console.log(flightsSrvc.outgoingFlights);
				if(otherAirlines===1){
					$http.get('/api/other/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+returningDate+'/'+seatClass).success(function(othersFlights){
						flightsSrvc.outgoingFlights=flightsSrvc.outgoingFlights.concat(othersFlights.outgoingFlights);
						flightsSrvc.returnFlights=flightsSrvc.returnFlights.concat(othersFlights.returnFlights);
						if(flightsSrvc.outgoingFlights.length===0 || flightsSrvc.returnFlights.length===0){
							flightsSrvc.foundFlights=0;
						}
						$location.url('/flights');
					});
				}
				else{
					if(flightsSrvc.outgoingFlights.length===0 || flightsSrvc.returnFlights.length===0){
						flightsSrvc.foundFlights=0;
					}
					$location.url('/flights');
				}
			}).error(function(err){console.log(err);});
		}


	};

	$scope.showBooking = function() {
		var bookingRef=$scope.bookingRef;
		bookingSrvc.bookingRefNo=bookingRef;
		$location.url('/booking');
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
	$scope.validateForm =  function(){

		if($scope.searchForm.$valid){
			return true;
		}
		else{
			$scope.clicked=true;
			return false;
		}

	};

});

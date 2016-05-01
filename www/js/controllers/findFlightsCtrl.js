angular.module('alaskaIonic').controller('findFlightsCtrl',function ($scope,$state,flightsSrvc,$http){

	$scope.airports=[
    {
        "iata": "HDF",
        "lon": "14.138242",
        "iso": "DE",
        "status": 1,
        "name": "Heringsdorf Airport",
        "continent": "EU",
        "type": "airport",
        "lat": "53.87825",
        "size": "medium"
    },
    {
        "iata": "BBH",
        "lon": "12.711667",
        "iso": "DE",
        "status": 1,
        "name": "Barth Airport",
        "continent": "EU",
        "type": "airport",
        "lat": "54.33972",
        "size": "small"
    }];


	$scope.findFlights = function() {
		var origin= $scope.origin;
		var destination= $scope.destination;
		var departingDate=new Date($scope.departingDate).getTime();
		// console.log($scope.departingDate);
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
        
        if(oneWay===0){
            var returnDate=new Date($scope.returningDate).getTime();
        }
        $state.go('tabsController.findFlights.flights');
                /*one way trip*/
        // if(oneWay===1){
        //     $http.get('/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+seatClass).success(function(flights){
        //         flightsSrvc.outgoingFlights.concat(flights);
        //         if(otherAirlines===1){
        //             $http.get('/api/other/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+seatClass).success(function(othersFlights){
        //                 flightsSrvc.outgoingFlights.concat(othersFlights.outgoingFlights);
        //                 if(flightsSrvc.outgoingFlights.length===0){
        //                     flightsSrvc.foundFlights=0;
        //                 }
        //                 $state.go('tabsController.findFlights.flights');
        //             });
        //         }
        //         else{
        //             if(flightsSrvc.outgoingFlights.length===0){
        //                 flightsSrvc.foundFlights=0;
        //             }
        //             $state.go('tabsController.findFlights.flights');
        //         }
        //     });
        // }
        // /*round trip*/
        // else{
        //     var returningDate=new Date($scope.returningDate).getTime();
        //     console.log('/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+returningDate+'/'+seatClass);
        //     $http.get('/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+returningDate+'/'+seatClass).success(function(flights){
        //         flightsSrvc.outgoingFlights.concat(flights.outgoingFlights);
        //         flightsSrvc.returnFlights.concat(flights.returnFlights);
        //         if(otherAirlines===1){
        //             $http.get('/api/other/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+returningDate+'/'+seatClass).success(function(othersFlights){
        //                 flightsSrvc.outgoingFlights.concat(othersFlights.outgoingFlights);
        //                 flightsSrvc.returnFlights.concat(othersFlights.returnFlights);
        //                 $state.go('tabsController.findFlights.flights');
        //                 if(flightsSrvc.outgoingFlights.length===0 || flightsSrvc.returnFlights.length===0){
        //                     flightsSrvc.foundFlights=0;
        //                 }
        //             });
        //         }
        //         else{
        //             if(flightsSrvc.outgoingFlights.length===0 || flightsSrvc.returnFlights.length===0){
        //                 flightsSrvc.foundFlights=0;
        //             }
        //             $state.go('tabsController.findFlights.flights');
        //         }
        //     });
        // }
		// console.log("one way:"+oneWay);
        // console.log("destination:"+destination);
        // console.log("departingDate:"+departingDate);
        // console.log("seatClass:"+seatClass);
        // console.log("otherAirlines:"+otherAirlines);
        // console.log("origin:"+origin);
		// console.log(oneWay+ " "+destination+ " "+departingDate+ " "+seatClass+ " "+otherAirlines+ " "+oneWay);
		// $state.go('tabsController.findFlights.flights');

	};


	$scope.notNull = function (airport){
		return airport.name != null;
	};

});

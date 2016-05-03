angular.module('alaskaIonic').controller('findFlightsCtrl',function ($scope,$state,flightsSrvc,$http){
     $http.get('http://localhost:3000/api/airports').success(function(data) {
        $scope.airports = data;
        masterSrvc.airports=data;
    });
	// $scope.airports=[
 //    {
 //        "iata": "HDF",
 //        "lon": "14.138242",
 //        "iso": "DE",
 //        "status": 1,
 //        "name": "Heringsdorf Airport",
 //        "continent": "EU",
 //        "type": "airport",
 //        "lat": "53.87825",
 //        "size": "medium"
 //    },
 //    {
 //        "iata": "BBH",
 //        "lon": "12.711667",
 //        "iso": "DE",
 //        "status": 1,
 //        "name": "Barth Airport",
 //        "continent": "EU",
 //        "type": "airport",
 //        "lat": "54.33972",
 //        "size": "small"
 //    }];


	$scope.findFlights = function() {
		var origin= $scope.origin;
		var destination= $scope.destination;
		var departingDate=new Date($scope.onezoneDatepickerOutgoing.date).getTime();
		console.log(departingDate);

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
        
        // if(oneWay===0){
        //     var returningDate=new Date($scope.onezoneDatepickerReturn.date).getTime();
        // }
        // $state.go('tabsController.findFlights.flights');
        // console.log(onezoneDatepicker.startDate);
                /*one way trip*/
        var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBbGFza2EiLCJpYXQiOjE0NjEwNDY5NjcsImV4cCI6MTQ5MjU4Mjk3NCwiYXVkIjoiIiwic3ViIjoiIn0.dxB2Mx4-1W-cqfSeE9LC6QfMGvtLSLXduLrm0j7xzWM';

        if(oneWay===1){
            $http.get('http://localhost:3000/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+seatClass+'?wt='+token).success(function(flights){
                console.log(flights);
                flightsSrvc.outgoingFlights.concat(flights);
                if(otherAirlines===1){
                    $http.get('http://52.207.211.179/api/other/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+seatClass+'?wt='+token).success(function(othersFlights){
                        flightsSrvc.outgoingFlights.concat(othersFlights.outgoingFlights);
                        if(flightsSrvc.outgoingFlights.length===0){
                            flightsSrvc.foundFlights=0;
                        }
                        $state.go('tabsController.findFlights.flights');
                    });
                }
                else{
                    if(flightsSrvc.outgoingFlights.length===0){
                        flightsSrvc.foundFlights=0;
                    }
                    $state.go('tabsController.findFlights.flights');
                }
            });
        }
        /*round trip*/
        else{
            var returningDate=new Date($scope.onezoneDatepickerReturn.date).getTime();
            // console.log('/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+returningDate+'/'+seatClass);
            $http.get('http://localhost:3000/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+returningDate+'/'+seatClass+'?wt='+token).success(function(flights){
              console.log(flights);
                flightsSrvc.outgoingFlights=flightsSrvc.outgoingFlights.concat(flights.outgoingFlights);
                flightsSrvc.returnFlights=flightsSrvc.returnFlights.concat(flights.returnFlights);
                console.log(flightsSrvc.outgoingFlights);
                console.log(flightsSrvc.returnFlights);
                if(otherAirlines===1){
                    $http.get('http://localhost:3000/api/other/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+returningDate+'/'+seatClass+'?wt='+token).success(function(othersFlights){
                        flightsSrvc.outgoingFlights.concat(othersFlights.outgoingFlights);
                        flightsSrvc.returnFlights.concat(othersFlights.returnFlights);
                        $state.go('tabsController.findFlights.flights');
                        if(flightsSrvc.outgoingFlights.length===0 || flightsSrvc.returnFlights.length===0){
                            flightsSrvc.foundFlights=0;
                        }
                    });
                }
                else{
                    if(flightsSrvc.outgoingFlights.length===0 || flightsSrvc.returnFlights.length===0){
                        flightsSrvc.foundFlights=0;
                    }
                    $state.go('tabsController.findFlights.flights');
                }
            });
        }

     


	};

  $scope.onezoneDatepickerOutgoing = {
    date: Date.now(), // MANDATORY                     
    mondayFirst: false,                                                     
    disablePastDays: true,
    disableSwipe: false,
    disableWeekend: false,
    startDate : Date.now(),
    showDatepicker: false,
    showTodayButton: true,
    calendarMode: false,
    hideCancelButton: false,
    hideSetButton: false,
    highlights: [],
    callback: function(value){
        // your code
    }
  };
  $scope.onezoneDatepickerReturn = {
    date: Date.now(), // MANDATORY                     
    mondayFirst: false,                                                     
    disablePastDays: true,
    disableSwipe: false,
    disableWeekend: false,
    startDate : Date.now(),
    showDatepicker: false,
    showTodayButton: true,
    calendarMode: false,
    hideCancelButton: false,
    hideSetButton: false,
    highlights: [],
    callback: function(value){
        // your code
    }
  };




	$scope.notNull = function (airport){
		return airport.name != null;
	};

});

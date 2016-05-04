angular.module('alaskaIonic').controller('findFlightsCtrl',function ($scope,$state,flightsSrvc,$http,masterSrvc){
    var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBbGFza2EiLCJpYXQiOjE0NjEwNDY5NjcsImV4cCI6MTQ5MjU4Mjk3NCwiYXVkIjoiIiwic3ViIjoiIn0.dxB2Mx4-1W-cqfSeE9LC6QfMGvtLSLXduLrm0j7xzWM';

    $http.get('http://localhost:3000/api/airports/?wt='+token).success(function(data) {
        $scope.airports = data;
        masterSrvc.airports=data;
    });
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

        console.log("one way:"+oneWay);
        console.log("destination:"+destination);
        console.log("departingDate:"+departingDate);
        console.log("seatClass:"+seatClass);
        console.log("otherAirlines:"+otherAirlines);
        console.log("origin:"+origin);
        console.log(oneWay+ " "+destination+ " "+departingDate+ " "+seatClass+ " "+otherAirlines+ " "+oneWay);
        // $state.go('tabsController.findFlights.flights');
    // flightsSrvc.outgoingFlights=[{ "flightNumber" : "SE280472",
    //  "aircraftModel" : "a318",
    //   "aircraftType" : "Airbus",
    //   "capacity" : 60,
    //   "duration" : "2 hours",
    //   "origin" : "BOM",
    //   "destination" : "DEL",
    //   "economyCost" : "150",
    //   "businessCost" : "300",
    //   "availableSeats" : 60,
    //   "availableEconomySeats" : 20,
    //   "availableBusinessSeats" : 40,
    //   "departureDateTime" : "2016-04-14 12:25 AM",
    //   "arrivalDateTime" : "2016-04-14 03:25 PM",
    //   "seatmap" : [ { "seatNumber" : "A1", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A2", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A3", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A4", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A5", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A6", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A7", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A8", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A9", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A10", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B1", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B2", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B3", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B4", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B5", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B6", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B7", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B8", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B9", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B10", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "C1", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C2", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C3", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C4", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C5", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C6", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C7", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C8", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C9", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C10", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D1", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D2", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D3", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D4", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D5", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D6", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D7", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D8", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D9", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D10", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E1", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E2", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E3", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E4", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E5", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E6", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E7", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E8", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E9", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E10", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F1", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F2", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F3", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F4", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F5", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F6", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F7", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F8", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F9", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F10", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null } ] }];


    //   flightsSrvc.returnFlights=[{ "flightNumber" : "SE280472",
    //  "aircraftModel" : "a318",
    //   "aircraftType" : "Airbus",
    //   "capacity" : 60,
    //   "duration" : "2 hours",
    //   "origin" : "BOM",
    //   "destination" : "DEL",
    //   "economyCost" : "150",
    //   "businessCost" : "300",
    //   "availableSeats" : 60,
    //   "availableEconomySeats" : 20,
    //   "availableBusinessSeats" : 40,
    //   "departureDateTime" : "2016-04-14 12:25 AM",
    //   "arrivalDateTime" : "2016-04-14 03:25 PM",
    //   "seatmap" : [ { "seatNumber" : "A1", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A2", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A3", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A4", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A5", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A6", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A7", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A8", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A9", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "A10", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B1", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B2", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B3", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B4", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B5", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B6", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B7", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B8", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B9", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "B10", "type" : "window", "cabin" : "business", "cost" : "300", "reservationID" : null }, { "seatNumber" : "C1", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C2", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C3", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C4", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C5", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C6", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C7", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C8", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C9", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "C10", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D1", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D2", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D3", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D4", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D5", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D6", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D7", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D8", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D9", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "D10", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E1", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E2", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E3", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E4", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E5", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E6", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E7", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E8", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E9", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "E10", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F1", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F2", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F3", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F4", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F5", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F6", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F7", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F8", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F9", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null }, { "seatNumber" : "F10", "type" : "aisle", "cabin" : "economy", "cost" : "150", "reservationID" : null } ] }];
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
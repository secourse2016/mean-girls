angular.module('alaskaIonic').controller('findFlightsCtrl',function ($scope,$state,flightsSrvc,$http,masterSrvc){

    // var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBbGFza2EiLCJpYXQiOjE0NjEwNDY5NjcsImV4cCI6MTQ5MjU4Mjk3NCwiYXVkIjoiIiwic3ViIjoiIn0.dxB2Mx4-1W-cqfSeE9LC6QfMGvtLSLXduLrm0j7xzWM';
    // $http.get('http://localhost:3000/api/airports/?wt='+token).success(function(data) {
    //     $scope.airports = data;
    //     masterSrvc.airports=data;
    // });
    $scope.airports=flightsSrvc.getAirports();
    masterSrvc.airports=flightsSrvc.getAirports();

    $scope.findFlights = function() {
        var origin= $scope.origin;
        var destination= $scope.destination;
        var departingDate=new Date($scope.onezoneDatepickerOutgoing.date).getTime();
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
        // var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBbGFza2EiLCJpYXQiOjE0NjEwNDY5NjcsImV4cCI6MTQ5MjU4Mjk3NCwiYXVkIjoiIiwic3ViIjoiIn0.dxB2Mx4-1W-cqfSeE9LC6QfMGvtLSLXduLrm0j7xzWM';
    var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBdXN0cmlhbiBBaXJsaW5lcyIsImlhdCI6MTQ2MDYzNTE1OCwiZXhwIjoxNDkyMTcxMTU4LCJhdWQiOiJ3d3cuYXVzdHJpYW4tYWlybGluZXMuY29tIiwic3ViIjoiYXVzdHJpYW5BaXJsaW5lcyJ9.Dilu6siLX3ouLk48rNASpYJcJSwKDTFYS2U4Na1M5k4';
        if(oneWay===1){
            $http.get('http://52.207.211.179/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+seatClass+'/1/'+'?wt='+token).success(function(flights){
                flightsSrvc.outgoingFlights.concat(flights);
                if(otherAirlines===1){
                    $http.get('http://localhost:3000/api/other/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+seatClass+'/1/'+'?wt='+token).success(function(othersFlights){
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
            $http.get('http://52.207.211.179/api/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+returningDate+'/'+seatClass+'/1/'+'?wt='+token).success(function(flights){
                flightsSrvc.outgoingFlights=flightsSrvc.outgoingFlights.concat(flights.outgoingFlights);
                flightsSrvc.returnFlights=flightsSrvc.returnFlights.concat(flights.returnFlights);
                console.log()

                if(otherAirlines===1){
                    $http.get('http://localhost:3000/api/other/flights/search/'+origin+'/'+destination+'/'+departingDate+'/'+returningDate+'/'+seatClass+'/1/'+'?wt='+token).success(function(othersFlights){
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

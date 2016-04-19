angular.module('alaska').factory('masterSrvc', function ($http,$location,masterSrvc,bookingSrvc) {
  return {
    Confirm : function(){
      var data={};
      data.payment=angular.copy(masterSrvc.payment);
      data.passenger=angular.copy(masterSrvc.passenger);
      data.outgoingFlight=angular.copy(masterSrvc.outgoingFlight.flightNumber);
      var oneWay=data.oneWay=angular.copy(masterSrvc.oneWay);
      if(oneWay!==1){
        data.returnFlight=angular.copy(masterSrvc.returnFlight.flightNumber);
      }
      else{
        data.returnFlight=null;
      }
      $http.post('/api/addbooking',data).success(function(booking){
        var bookingReference=booking.bookingReference;
        bookingSrvc.bookingReference=bookingReference;
        })
      })

    }

  };
});

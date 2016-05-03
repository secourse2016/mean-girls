
// angular.module('alaskaIonic').factory('masterSrvc', function ($http,$location,bookingSrvc) {
angular.module('alaskaIonic').factory('masterSrvc', function ($http,$location) {

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
      // $http.post('/api/addbooking',data).success(function(booking){

      //   var bookingRefNo=booking.bookingRefNo;
      //   bookingSrvc.bookingRefNo=bookingRefNo;
      //   $location.url('/booking');
      // });

      //   var bookingReference=booking.bookingReference;
      //   bookingSrvc.bookingReference=bookingReference;
      //   $location.url('/booking');
      // })


    }

  };

});

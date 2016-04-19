angular.module('alaska').factory('masterSrvc', function ($http,$location,bookingSrvc) {
  return {
    Confirm : function(){
      var data={};
      data.payment=this.amount;
      data.payment=angular.copy(this.payment);
      data.passenger=angular.copy(this.passenger);
      data.class=this.seatClass;
      data.outgoingFlight=angular.copy(this.outgoingFlight.flightNumber);
      var oneWay=data.oneWay=angular.copy(this.oneWay);
      if(oneWay!==1){
        data.returnFlight=angular.copy(this.returnFlight.flightNumber);
      }
      else{
        data.returnFlight=null;
      }
      $http.post('/api/addbooking',data).success(function(booking){
        var bookingRefNo=booking.bookingRefNo;
        bookingSrvc.bookingRefNo=bookingRefNo;
        $location.url('/booking');
      });

    }

  };
});

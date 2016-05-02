angular.module('alaska').factory('masterSrvc', function ($http,$location,bookingSrvc) {
  return {
    Confirm : function(){
      var data={};
      data.payment=angular.copy(this.payment);
      data.payment.amount=this.amount;
      data.passenger=angular.copy(this.passenger);
      data.class=this.seatClass;
      data.oneWay=this.oneWay;
      data.outgoingFlightId=angular.copy(this.outgoingFlight.flightNumber);
      data.paymentToken = this.paymentToken;
      var oneWay=data.oneWay=angular.copy(this.oneWay);
      if(oneWay!==1){
        data.returnFlightId=angular.copy(this.returnFlight.flightNumber);
      }
      else{
        data.returnFlightId=null;
      }
      $http.post('/api/booking',data).success(function(booking){
          var bookingRef = booking.bookingRefNo;
          console.log("BookingRef: "+bookingRef);
          $http.get('/api/booking/'+bookingRef).success(function(booking1){
            console.log("Booking1: "+ booking1);
      			bookingSrvc.booking=booking1;
      			$location.url('/booking');
      		});
      });

    }

  };
});

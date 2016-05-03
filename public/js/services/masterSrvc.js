angular.module('alaska').factory('masterSrvc', function ($http,$location,bookingSrvc) {
  return {
    Confirm : function(){
      var data={};
      data.payment=angular.copy(this.payment);
      data.payment.amount=this.amount;
      data.passenger=angular.copy(this.passenger);
      data.class=this.seatClass;
      data.oneWay=this.oneWay;
      data.outgoingFlight=angular.copy(this.outgoingFlight.flightNumber);
      var oneWay=data.oneWay=angular.copy(this.oneWay);
      if(oneWay!==1){
        data.returnFlight=angular.copy(this.returnFlight.flightNumber);
      }
      else{
        data.returnFlight=null;
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

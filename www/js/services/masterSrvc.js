
// angular.module('alaskaIonic').factory('masterSrvc', function ($http,$location,bookingSrvc) {
angular.module('alaskaIonic').factory('masterSrvc', function ($http,$state,bookingSrvc) {
  var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBbGFza2EiLCJpYXQiOjE0NjEwNDY5NjcsImV4cCI6MTQ5MjU4Mjk3NCwiYXVkIjoiIiwic3ViIjoiIn0.dxB2Mx4-1W-cqfSeE9LC6QfMGvtLSLXduLrm0j7xzWM';
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
      // $http.post('http://localhost:3000/api/addbooking?wt='+token,data).success(function(booking){

      //   var bookingRefNo=booking.bookingRefNo;
      //   bookingSrvc.bookingRefNo=bookingRefNo;
      //   $state.go('tabsController.findFlights.flights.passengerInfo.payment.viewBooking');
      // });

       $http.post('http://localhost:3000/api/booking'+'?wt='+token,data,{headers : {
                'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
            }}).success(function(booking){
          var bookingRef = booking.bookingRefNo;
          console.log('Booking:'+booking);
          console.log("BookingRef: "+bookingRef);
          $http.get('http://localhost:3000/api/booking/'+bookingRef+'?wt='+token).success(function(booking1){
            console.log("Booking1: "+ booking1);
            bookingSrvc.booking=booking1;
            $state.go('tabsController.findFlights.flights.passengerInfo.payment.viewBooking');
          });
      });

    }
  }

});

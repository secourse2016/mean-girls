angular.module('alaska').factory('masterSrvc', function ($http,$location,bookingSrvc,modalSrvc,$uibModal) {
  return {
    Confirm : function(){

      var cardType      = this.payment.cardType;
      var cardNo        = this.payment.cardNo;
      var cvc           = this.payment.cvc;
      var expiryMonth   = this.payment.expiryMonth;
      var expiryYear    = this.payment.expiryYear;
      var returnFlight  = this.returnFlight;
      var outgoingFlight= this.outgoingFlight;

      if(returnFlight.Airline === outgoingFlight.Airline){

        if(returnFlight.Airline === "Alaska"){

          Stripe.card.createToken({
            number: cardNo,
            cvc: cvc,
            exp_month: expiryMonth,
            exp_year: expiryYear
          },
          $scope.roundAlaska
        );
      }
      else
      {
        //round trip by another Airline
        var airlineIP = returnFlight.airlineIP;
        $http.get(airlineIP + '/stripe/pubkey' , function(pubkey){
          Stripe.setPublishableKey(pubkey);
          Stripe.card.createToken({
            number: cardNo,
            cvc: cvc,
            exp_month: expiryMonth,
            exp_year: expiryYear
          },
          $scope.roundOther
        );
      }
    }
  }
}
roundOther : function (status, response){
  

}

roundAlaska: function(status,response){
  if (response.error) {
    // Problem!
    $scope.openModal("Error occured during card verification: "+ response.error);
    return;
  }
  // Token was created!
  // Get the token ID:
  console.log("hallelujah");
  var token = response.id;
  var emptyArr  = [];
  var data={};

  data.paymentToken     = token;
  data.passengerDetails = emptyArr.push(angular.copy(this.passenger));
  data.class            = this.seatClass;
  data.outgoingFlightId = angular.copy(this.outgoingFlight.flightId);
  data.returnFlightId   = angular.copy(this.returnFlight.flightId);
  data.cost             = this.outgoingFlight.cost + this.returnFlight.cost;

  $http.post('/api/booking',data).success(function(res){
    //couldn't charge the card
    if(res.errorMessage){
      this.openModal(res.errorMessage);
      return;
    }

    var bookingRef = res.refNum;
    $http.get('/api/booking/'+bookingRef).success(function(booking){
      bookingSrvc.booking=booking;
      $location.url('/booking');
    });

  });
}

openModal:function(message){
  modalSrvc.modalMessage = message;
  var modalInstance = $uibModal.open({
    templateUrl: 'myModalContent.html',
    controller: 'ModalInstanceCtrl'
  });
}

}
});

angular.module('alaska').factory('masterSrvc', function ($http,$location,bookingSrvc,modalSrvc,$uibModal,confirmSrvc) {
  return {
    Confirm : function(){

      var cardType      = this.payment.cardType;
      var cardNo        = this.payment.cardNo;
      var cvc           = this.payment.cvc;
      var expiryMonth   = this.payment.expiryMonth;
      var expiryYear    = this.payment.expiryYear;
      var returnFlight  = this.returnFlight;
      var outgoingFlight= this.outgoingFlight;
      var emptyArr  = [];
      var data={};

      data.passengerDetails = emptyArr.push(angular.copy(this.passenger));
      data.class            = this.seatClass;
      data.outgoingFlightId = angular.copy(this.outgoingFlight.flightId);
      data.returnFlightId   = angular.copy(this.returnFlight.flightId);
      data.cost             = this.outgoingFlight.cost + this.returnFlight.cost;
      this.data=data;

      if(returnFlight.Airline === outgoingFlight.Airline){

        var airlineIP = returnFlight.airlineIP;

        $http.get(airlineIP + '/stripe/pubkey').success(function(pubkey){
          Stripe.setPublishableKey(pubkey);
          Stripe.card.createToken({
            number: cardNo,
            cvc: cvc,
            exp_month: expiryMonth,
            exp_year: expiryYear
          },
          this.roundSameAirline
        );
      });

    }
    else {     //flights by diff. airlines
      //create 2 tokens, one for each airline
      var outAirlineIP = outgoingFlight.airlineIP;
      var retAirlineIP = returnFlight.airlineIP;

      $http.get(outAirlineIP + '/stripe/pubkey').success(function(pubkey){
        Stripe.setPublishableKey(pubkey);
        Stripe.card.createToken({
          number: cardNo,
          cvc: cvc,
          exp_month: expiryMonth,
          exp_year: expiryYear
        },
        function(status,response){
          if(response.error){
            // Problem!
            this.openModal("Error occured during card verification: "+ response.error);
            return;
          }
          var outToken = response.id;
          $http.get(retAirlineIP + '/stripe/pubkey').success(function(pubkey){
            Stripe.setPublishableKey(pubkey);
            Stripe.card.createToken(
              {
                number: cardNo,
                cvc: cvc,
                exp_month: expiryMonth,
                exp_year: expiryYear
              },function (status1, response1) {
                Stripe.setPublishableKey('pk_test_I5BoepTFhbNEZbcMq5eUeSRg'); //return to MY pubkey
                if(response1.error){
                  // Problem!
                  this.openModal("Error occured during card verification: "+ response1.error);
                  return;
                }

                var retToken = response1.id;

                //now ready to issue 2 post requests
                //modify post request body
                //for outgoing
                var outReq = angular.copy(data);
                outReq.paymentToken = outToken;
                outReq.returnFlightId = null;
                $http.post(outAirlineIP + '/booking', outReq).success(function (resOut) {
                  if(resOut.errorMessage){
                    //couldn't charge the card
                    this.openModal(resOut.errorMessage);
                    return;
                  }
                  confirmSrvc.bookingRefOut = resOut.refNum;

                  //modify for return
                  var retReq = angular.copy(data);
                  retReq.paymentToken     = retToken;
                  retReq.outgoingFlightId = data.returnFlightId;
                  retReq.returnFlightId   = null;
                  $http.post(retAirlineIP + '/booking',retReq).success(function (resRet){
                    if(resRet.errorMessage){
                      //couldn't charge the card
                      this.openModal(resRet.errorMessage);
                      return;
                    }
                    confirmSrvc.bookingRefRet = resRet.refNum;
                    //done
                    location.url('/confirm');
                  })
                }

              }

            })
          });
        }
      );
    });
  }
}
roundDiffAirline : function (){



}

roundSameAirline : function (status, response){
  Stripe.setPublishableKey('pk_test_I5BoepTFhbNEZbcMq5eUeSRg');
  if (response.error) {
    // Problem!
    this.openModal("Error occured during card verification: "+ response.error);
    return;
  }
  // Token was created!
  // Get the token ID:
  console.log("hallelujah");
  var token = response.id;
  this.data.paymentToken     = token;

  $http.post(airlineIP + '/booking',data).success(function(res){
    if(res.errorMessage){
      //couldn't charge the card
      this.openModal(res.errorMessage);
      return;
    }
    var bookingRef = res.refNum;
    confirmSrvc.bookingRefOut = res.refNum;
    confirmSrvc.bookingRefRet = null;
    location.url('/confirm');
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

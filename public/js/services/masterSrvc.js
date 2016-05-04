angular.module('alaska').factory('masterSrvc', function ($http,$location,bookingSrvc,modalSrvc,$uibModal,confirmSrvc){
  return {

    Confirm : function(){
      var returnFlight  = this.returnFlight;
      var outgoingFlight= this.outgoingFlight;

      var emptyArr  = [];
      var data={};
      data.passengerDetails = emptyArr.push(angular.copy(this.passenger));
      data.class            = this.seatClass;
      data.outgoingFlightId = angular.copy(this.outgoingFlight.flightId);

      if(returnFlight)
      {
        data.returnFlightId   = angular.copy(this.returnFlight.flightId);
      }

      this.data=data;
      console.log("data: "+this.data);

      if(!returnFlight) //oneWay flight
      {
        console.log("not return flight");
        this.outHandler(this.bookingOneWayHandler, function(){
          location.url('/confirm');
        });
      }
      else{ //roundTripe
        if(returnFlight.Airline === outgoingFlight.Airline){ //by same airline
          this.roundHandler();
        }
        else {     // by diff. airlines
          this.outHandler(this.retHandler,this.bookingOneWayHandler);
        }

      }
    }
    ,
    bookingOneWayHandler  : function (outToken,cb) {
      var outAirline   = this.outgoingFlight.Airline;
      var outAirlineIP = outAirline === "Alaska" ? "" : this.outgoingFlight.airlineIP;

      var outReq = angular.copy(this.data);
      outReq.paymentToken = outToken;
      outReq.returnFlightId = null;

      $http.post(outAirlineIP + '/booking', outReq).success(function (resOut){
        if(resOut.errorMessage){
          //couldn't charge the card
          this.openModal(resOut.errorMessage);
          return;
        }
        confirmSrvc.bookingRefOut = resOut.refNum;
        confirmSrvc.airlineOut  = outgoingFlight.Airline;
        confirmSrvc.bookingRefRet = null;
        cb();

      });
    }
    ,
    retHandler          : function(outToken,cb){

      var cardType      = this.payment.cardType;
      var cardNo        = this.payment.cardNo;
      var cvc           = this.payment.cvc;
      var expiryMonth   = this.payment.expiryMonth;
      var expiryYear    = this.payment.expiryYear;
      var returnFlight  = this.returnFlight;
      var outgoingFlight= this.outgoingFlight;

      var retAirline   = this.returnFlight.Airline;
      var retAirlineIP = retAirline === "Alaska" ? "" : this.returnFlight.airlineIP;

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
            cb(outToken,retToken);
          });
        });
      }
      ,

      bookingRoundHandler : function(outToken, retToken){

        var outAirline   = this.outgoingFlight.Airline;
        var outAirlineIP = outAirline === "Alaska" ? "" : this.outgoingFlight.airlineIP;

        var retAirline   = this.returnFlight.Airline;
        var retAirlineIP = retAirline === "Alaska" ? "" : this.returnFlight.airlineIP;

        var outReq = angular.copy(this.data);
        outReq.paymentToken = outToken;
        outReq.returnFlightId = null;
        outReq.cost = this.outgoingFlight.cost;

        $http.post(outAirlineIP + '/booking', outReq).success(function (resOut){
          if(resOut.errorMessage){
            //couldn't charge the card
            this.openModal(resOut.errorMessage);
            return;
          }
          confirmSrvc.bookingRefOut = resOut.refNum;
          confirmSrvc.airlineOut  = this.outgoingFlight.Airline;

          //modify for return
          var retReq = angular.copy(this.data);
          retReq.paymentToken     = retToken;
          retReq.outgoingFlightId = this.data.returnFlightId;
          retReq.returnFlightId   = null;
          retReq.cost = this.returnFlight.cost;

          $http.post(retAirlineIP + '/booking',retReq).success(function (resRet){
            if(resRet.errorMessage){
              //couldn't charge the card
              this.openModal(resRet.errorMessage);
              return;
            }
            confirmSrvc.bookingRefRet = resRet.refNum;
            confirmSrvc.airlineRet = this.returnFlight.Airline;
            //done
            location.url('/confirm');
          });
        });
      }
      ,
      outHandler       : function(cb1,cb2){
        var cardType      = this.payment.cardType;
        var cardNo        = this.payment.cardNo;
        var cvc           = this.payment.cvc;
        var expiryMonth   = this.payment.expiryMonth;
        var expiryYear    = this.payment.expiryYear;
        var returnFlight  = this.returnFlight;
        var outgoingFlight= this.outgoingFlight;

        var outAirline   = this.outgoingFlight.Airline;
        var outAirlineIP = outAirline === "Alaska" ? "" : this.outgoingFlight.airlineIP;
        console.log("outHandler called");
        $http.get(outAirlineIP + '/stripe/pubkey').success(function(pubkey){
          console.log("pub key: "+ pubkey);
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
              console.log(response.error);
              return;
            }
            console.log("card created for one way");
            var outToken = response.id;
            console.log(outToken);
            cb1(outToken,cb2); //handle the return flight
          });
        });
      }
      ,
      roundHandler     : function(){

        var cardType      = this.payment.cardType;
        var cardNo        = this.payment.cardNo;
        var cvc           = this.payment.cvc;
        var expiryMonth   = this.payment.expiryMonth;
        var expiryYear    = this.payment.expiryYear;

        var returnFlight  = this.returnFlight;
        var outgoingFlight= this.outgoingFlight;

        var airline   = returnFlight.Airline;
        var airlineIP = airline==="Alaska"? "" :returnFlight.airlineIP;

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
    ,
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
      var req = angular.copy(this.data);
      req.paymentToken     = token;
      req.cost = this.outgoingFlight.cost + this.returnFlight.cost;

      var airline   = returnFlight.Airline;
      var airlineIP = airline==="Alaska"? "" :returnFlight.airlineIP;

      $http.post(airlineIP + '/booking',req).success(function(res){
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

    ,

    openModal :  function(message){
      modalSrvc.modalMessage = message;
      var modalInstance = $uibModal.open({
        templateUrl: 'myModalContent.html',
        controller: 'ModalInstanceCtrl'
      });
    }

  }
});

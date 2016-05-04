angular.module('alaska').service('masterSrvc', function ($http,$location,bookingSrvc,modalSrvc,$uibModal,confirmSrvc){
  var srvc  = this;
  srvc.Confirm = function(){
    var returnFlight  = srvc.returnFlight;
    var outgoingFlight= srvc.outgoingFlight;

    var emptyArr  = [];
    var data={};
    emptyArr.push(srvc.passenger);
    data.passengerDetails =emptyArr;
    console.log(emptyArr);
    data.class            = srvc.seatClass;
    data.outgoingFlightId = srvc.outgoingFlight.flightId;

    if(returnFlight)
    {
      data.returnFlightId   = srvc.returnFlight.flightId;
    }

    srvc.data=data;
    console.log("data: "+srvc.data);

    if(!returnFlight) //oneWay flight
    {
      console.log("not return flight");
      srvc.outHandler(srvc.bookingOneWayHandler, function(){
        console.log("geh hena");
        $location.url('/confirm');
      });
    }
    else{ //roundTripe
      if(returnFlight.Airline === outgoingFlight.Airline){ //by same airline
        srvc.roundHandler();
      }
      else {     // by diff. airlines
        srvc.outHandler(srvc.retHandler,srvc.bookingOneWayHandler);
      }

    }
  }

  srvc.bookingOneWayHandler = function (outToken,cb) {
    var outAirline   = srvc.outgoingFlight.Airline;
    var outAirlineIP = outAirline === "Alaska" ? "" : srvc.outgoingFlight.airlineIP;

    var outReq = angular.copy(srvc.data);
    outReq.paymentToken = outToken;
    outReq.returnFlightId = null;
    outReq.cost = srvc.outgoingFlight.cost;

    $http.post(outAirlineIP + '/booking', outReq).success(function (resOut){
      console.log("5allas tamam");
      if(resOut.errorMessage){
        //couldn't charge the card
        srvc.openModal(resOut.errorMessage);
        return;
      }
      confirmSrvc.bookingRefOut = resOut.refNum;
      confirmSrvc.airlineOut  = srvc.outgoingFlight.Airline;
      confirmSrvc.bookingRefRet = null;
      cb();

    });
  }

  srvc.retHandler         = function(outToken,cb){

    var cardType      = srvc.payment.cardType;
    var cardNo        = srvc.payment.cardNo;
    var cvc           = srvc.payment.cvc;
    var expiryMonth   = srvc.payment.expiryMonth;
    var expiryYear    = srvc.payment.expiryYear;
    var returnFlight  = srvc.returnFlight;
    var outgoingFlight= srvc.outgoingFlight;

    var retAirline   = srvc.returnFlight.Airline;
    var retAirlineIP = retAirline === "Alaska" ? "" : srvc.returnFlight.airlineIP;

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
            srvc.openModal("Error occured during card verification: "+ response1.error);
            return;
          }
          var retToken = response1.id;
          //now ready to issue 2 post requests
          cb(outToken,retToken);
        });
      });
    }

    srvc.bookingRoundHandler = function(outToken, retToken){

      var outAirline   = srvc.outgoingFlight.Airline;
      var outAirlineIP = outAirline === "Alaska" ? "" : srvc.outgoingFlight.airlineIP;

      var retAirline   = srvc.returnFlight.Airline;
      var retAirlineIP = retAirline === "Alaska" ? "" : srvc.returnFlight.airlineIP;

      var outReq = angular.copy(srvc.data);
      outReq.paymentToken = outToken;
      outReq.returnFlightId = null;
      outReq.cost = srvc.outgoingFlight.cost;
      $http.post(outAirlineIP + '/booking', outReq).success(function (resOut){
        if(resOut.errorMessage){
          //couldn't charge the card
          srvc.openModal(resOut.errorMessage);
          return;
        }
        confirmSrvc.bookingRefOut = resOut.refNum;
        confirmSrvc.airlineOut  = srvc.outgoingFlight.Airline;

        //modify for return
        var retReq = angular.copy(srvc.data);
        retReq.paymentToken     = retToken;
        retReq.outgoingFlightId = srvc.data.returnFlightId;
        retReq.returnFlightId   = null;
        retReq.cost = srvc.returnFlight.cost;

        $http.post(retAirlineIP + '/booking',retReq).success(function (resRet){
          if(resRet.errorMessage){
            //couldn't charge the card
            srvc.openModal(resRet.errorMessage);
            return;
          }
          confirmSrvc.bookingRefRet = resRet.refNum;
          confirmSrvc.airlineOut = srvc.outgoingFlight.Airline;
          //done
          $location.url('/confirm');
        });
      });
    }

    srvc.outHandler       = function(cb1,cb2){
      var cardType      = srvc.payment.cardType;
      var cardNo        = srvc.payment.cardNo;
      var cvc           = srvc.payment.cvc;
      var expiryMonth   = srvc.payment.expiryMonth;
      var expiryYear    = srvc.payment.expiryYear;
      var returnFlight  = srvc.returnFlight;
      var outgoingFlight= srvc.outgoingFlight;

      var outAirline   = srvc.outgoingFlight.Airline;
      var outAirlineIP = outAirline === "Alaska" ? "" : srvc.outgoingFlight.airlineIP;
      console.log("outHandler called");
      var master= srvc;
      $http.get(outAirlineIP + '/stripe/pubkey').success(function(pubkey){
        console.log("pub key: "+ pubkey);
        console.log(cardNo);
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
            master.openModal("Error occured during card verification: "+ response.error);
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

    srvc.roundHandler     = function(){

      var cardType      = srvc.payment.cardType;
      var cardNo        = srvc.payment.cardNo;
      var cvc           = srvc.payment.cvc;
      var expiryMonth   = srvc.payment.expiryMonth;
      var expiryYear    = srvc.payment.expiryYear;

      var returnFlight  = srvc.returnFlight;
      var outgoingFlight= srvc.outgoingFlight;

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
        srvc.roundSameAirline
      );
    });
  }

  srvc.roundSameAirline = function (status, response){
    Stripe.setPublishableKey('pk_test_I5BoepTFhbNEZbcMq5eUeSRg');
    if (response.error) {
      // Problem!
      srvc.openModal("Error occured during card verification: "+ response.error);
      return;
    }
    // Token was created!
    // Get the token ID:
    console.log("hallelujah");
    var token = response.id;
    var req = angular.copy(srvc.data);
    req.paymentToken     = token;
    req.cost = parseInt(srvc.outgoingFlight.cost) + parseInt(srvc.returnFlight.cost);

    var airline   = srvc.returnFlight.Airline;
    var airlineIP = airline==="Alaska"? "" :srvc.returnFlight.airlineIP;

    $http.post(airlineIP + '/booking',req).success(function(res){
      if(res.errorMessage){
        //couldn't charge the card
        srvc.openModal(res.errorMessage);
        return;
      }
      var bookingRef = res.refNum;
      confirmSrvc.bookingRefOut = res.refNum;
      confirmSrvc.bookingRefRet = null;
      $location.url('/confirm');
    });

  }



  srvc.openModal =  function(message){
    modalSrvc.modalMessage = message;
    var modalInstance = $uibModal.open({
      templateUrl: 'myModalContent.html',
      controller: 'ModalInstanceCtrl'
    });
  }


});

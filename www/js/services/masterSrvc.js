angular.module('alaskaIonic').service('masterSrvc', function ($http,$state,bookingSrvc,confirmSrvc){
  var jwt ='eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBdXN0cmlhbiBBaXJsaW5lcyIsImlhdCI6MTQ2MDYzNTE1OCwiZXhwIjoxNDkyMTcxMTU4LCJhdWQiOiJ3d3cuYXVzdHJpYW4tYWlybGluZXMuY29tIiwic3ViIjoiYXVzdHJpYW5BaXJsaW5lcyJ9.Dilu6siLX3ouLk48rNASpYJcJSwKDTFYS2U4Na1M5k4';
  var srvc  = this;
  srvc.Confirm = function(){
    var returnFlight  = srvc.returnFlight;
    var outgoingFlight= srvc.outgoingFlight;

    var emptyArr  = [];
    var data={};
    emptyArr.push(srvc.passenger);
    data.passengerDetails =emptyArr;
    console.dir(emptyArr);
    data.class            = srvc.seatClass;
    data.outgoingFlightId = srvc.outgoingFlight.flightId;
    if(returnFlight)
    {
      data.returnFlightId   = srvc.returnFlight.flightId;
    }

    srvc.data=data;
    console.dir("data: "+srvc.data);

    if(!returnFlight) //oneWay flight
    {
      console.dir("not return flight");
      srvc.outHandler(srvc.bookingOneWayHandler, function(){
        console.dir("geh hena");
        $state.go('tabsController.findFlights.flights.passengerInfo.payment.confirmation');
      });
    }
    else{ //roundTripe
      if(returnFlight.Airline === outgoingFlight.Airline){ //by same airline
        srvc.roundHandler();
      }
      else {     // by diff. airlines
        srvc.outHandler(srvc.retHandler,srvc.bookingRoundHandler);
      }

    }
  }

  srvc.bookingOneWayHandler = function (outToken,cb) {
    var outAirline   = srvc.outgoingFlight.Airline;
    var outAirlineIP = outAirline === "Alaska" ? "http://52.207.211.179" : srvc.outgoingFlight.airlineIP;

    var outReq = angular.copy(srvc.data);
    outReq.paymentToken = outToken;
    outReq.returnFlightId = null;
    outReq.cost = srvc.outgoingFlight.cost;
    console.dir(JSON.stringify(outReq));

    $http.post(outAirlineIP + '/booking/?wt='+jwt, outReq).success(function (resOut){
      console.dir("5allas tamam");
      if(resOut.errorMessage){
        //couldn't charge the card
        // srvc.openModal(resOut.errorMessage);
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
    var retAirlineIP = retAirline === "Alaska" ? "http://52.207.211.179" : srvc.returnFlight.airlineIP;

    $http.get(retAirlineIP + '/stripe/pubkey/?wt='+jwt).success(function(pubkey){
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
            // srvc.openModal("Error occured during card verification: "+ response1.error);
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
      var outAirlineIP = outAirline === "Alaska" ? "http://52.207.211.179" : srvc.outgoingFlight.airlineIP;

      var retAirline   = srvc.returnFlight.Airline;
      var retAirlineIP = retAirline === "Alaska" ? "http://52.207.211.179" : srvc.returnFlight.airlineIP;

      var outReq = angular.copy(srvc.data);
      outReq.paymentToken = outToken;
      outReq.returnFlightId = null;
      outReq.cost = srvc.outgoingFlight.cost;
      console.dir(JSON.stringify(outReq));

      $http.post(outAirlineIP + '/booking/?wt='+jwt, outReq).success(function (resOut){
        if(resOut.errorMessage){
          //couldn't charge the card
          console.log(resOut.errorMessage);
          // srvc.openModal(resOut.errorMessage);
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
        console.dir("request booking: "+ retReq);

        $http.post(retAirlineIP + '/booking/?wt='+jwt,retReq).success(function (resRet){
          if(resRet.errorMessage){
            //couldn't charge the card
            // srvc.openModal(resRet.errorMessage);
            return;
          }
          confirmSrvc.bookingRefRet = resRet.refNum;
          confirmSrvc.airlineOut = srvc.outgoingFlight.Airline;
          confirmSrvc.airlineRet = srvc.returnFlight.Airline;
          //done
          $state.go('tabsController.findFlights.flights.passengerInfo.payment.confirmation');
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
      var outAirlineIP = outAirline === "Alaska" ? "http://52.207.211.179" : srvc.outgoingFlight.airlineIP;
      console.dir("outHandler called");
      var master= srvc;
      $http.get(outAirlineIP + '/stripe/pubkey/?wt='+jwt).success(function(pubkey){
        console.dir("pub key: "+ pubkey);
        console.dir(cardNo);
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
            // master.openModal("Error occured during card verification: "+ response.error);
            console.dir(response.error);
            return;
          }
          console.dir("card created for one way");
          var outToken = response.id;
          console.dir(outToken);
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
      var airlineIP = airline==="Alaska"? "http://52.207.211.179" :returnFlight.airlineIP;

      $http.get(airlineIP + '/stripe/pubkey/?wt='+jwt).success(function(pubkey){
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
      // srvc.openModal("Error occured during card verification: "+ response.error);
      return;
    }
    // Token was created!
    // Get the token ID:
    console.dir("hallelujah");
    var token = response.id;
    var req = angular.copy(srvc.data);
    req.paymentToken     = token;
    req.cost = parseInt(srvc.outgoingFlight.cost) + parseInt(srvc.returnFlight.cost);

    var airline   = srvc.returnFlight.Airline;
    var airlineIP = airline==="Alaska"? "http://52.207.211.179" :srvc.returnFlight.airlineIP;


    $http.post(airlineIP + '/booking/?wt='+jwt,req).success(function(res){
      if(res.errorMessage){
        console.log(res.errorMessage);
        //couldn't charge the card
        // srvc.openModal(res.errorMessage);
        return;
      }
      var bookingRef = res.refNum;
      confirmSrvc.bookingRefOut = res.refNum;
      confirmSrvc.bookingRefRet = null;
      $state.go('tabsController.findFlights.flights.passengerInfo.payment.confirmation');
    });

  }



});

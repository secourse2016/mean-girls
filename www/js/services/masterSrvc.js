
// angular.module('alaskaIonic').factory('masterSrvc', function ($http,$location,bookingSrvc) {
angular.module('alaskaIonic').service('masterSrvc', function ($http,$state,bookingSrvc,confirmSrvc) {
  var service = this;
  // var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBbGFza2EiLCJpYXQiOjE0NjEwNDY5NjcsImV4cCI6MTQ5MjU4Mjk3NCwiYXVkIjoiIiwic3ViIjoiIn0.dxB2Mx4-1W-cqfSeE9LC6QfMGvtLSLXduLrm0j7xzWM';
  // return {

  //     var data={};
  //     data.payment=angular.copy(service.payment);
  //     data.payment.amount=service.amount;
  //     data.passenger=angular.copy(service.passenger);
  //     data.class=service.seatClass;
  //     data.oneWay=service.oneWay;
  //     data.outgoingFlight=angular.copy(service.outgoingFlight.flightNumber);
  //     var oneWay=data.oneWay=angular.copy(service.oneWay);
  //     if(oneWay!==1){
  //       data.returnFlight=angular.copy(service.returnFlight.flightNumber);
  //     }
  //     else{
  //       data.returnFlight=null;
  //     }

  //      $http.post('http://localhost:3000/api/booking'+'?wt='+token,data,{headers : {
  //               'Content-Type' : 'application/x-www-form-urlencoded; charset=UTF-8'
  //           }}).success(function(booking){
  //         var bookingRef = booking.bookingRefNo;
  //         console.log('Booking:'+booking);
  //         console.log("BookingRef: "+bookingRef);
  //         $http.get('http://localhost:3000/api/booking/'+bookingRef+'?wt='+token).success(function(booking1){
  //           console.log("Booking1: "+ booking1);
  //           bookingSrvc.booking=booking1;
  //           $state.go('tabsController.findFlights.flights.passengerInfo.payment.viewBooking');
  //         });
  //     });

  //   }
  // return {
   service.Confirm=function(){
      var data={};
      data.payment=angular.copy(service.payment);
      data.payment.amount=service.amount;
      data.passenger=angular.copy(service.passenger);
      data.class=service.seatClass;
      data.oneWay=service.oneWay;
      // data.outgoingFlight=angular.copy(service.outgoingFlight.flightNumber);
      var returnFlight  = service.returnFlight;
      var outgoingFlight= service.outgoingFlight;

      var emptyArr  = [];
      data.passengerDetails = emptyArr.push(angular.copy(service.passenger));
      data.outgoingFlightId = angular.copy(service.outgoingFlight.flightId);

      if(returnFlight)
      {
        data.returnFlightId   = angular.copy(service.returnFlight.flightId);
      }

      service.data=data;
      console.log("data: "+service.data);

      if(!returnFlight) //oneWay flight
      {
        console.log("not return flight");
        service.outHandler(service.bookingOneWayHandler, function(){
          $state.go('tabsController.findFlights.flights.passengerInfo.payment.confirmation');
        });
      }
      else{ //roundTripe
        if(returnFlight.Airline === outgoingFlight.Airline){ //by same airline
          service.roundHandler();
        }
        else {     // by diff. airlines
          service.outHandler(service.retHandler,service.bookingOneWayHandler);
        }

      }
    }
    
    service.bookingOneWayHandler=function (outToken,cb) {
      var outAirline   = service.outgoingFlight.Airline;
      var outAirlineIP = outAirline === "Alaska" ? "" : service.outgoingFlight.airlineIP;

      var outReq = angular.copy(service.data);
      outReq.paymentToken = outToken;
      outReq.returnFlightId = null;

      $http.post('http://localhost:3000'+outAirlineIP + '/booking', outReq).success(function (resOut){
        if(resOut.errorMessage){
          //couldn't charge the card
          // service.openModal(resOut.errorMessage);
          console.log(resOut.errorMessage);
          return;
        }
        confirmSrvc.bookingRefOut = resOut.refNum;
        confirmSrvc.airlineOut  = outgoingFlight.Airline;
        confirmSrvc.bookingRefRet = null;
        cb();

      });
    }
    
    service.retHandler = function(outToken,cb){

      var cardType      = service.payment.cardType;
      var cardNo        = service.payment.cardNo;
      var cvc           = service.payment.cvc;
      var expiryMonth   = service.payment.expiryMonth;
      var expiryYear    = service.payment.expiryYear;
      var returnFlight  = service.returnFlight;
      var outgoingFlight= service.outgoingFlight;

      var retAirline   = service.returnFlight.Airline;
      var retAirlineIP = retAirline === "Alaska" ? "" : service.returnFlight.airlineIP;

      $http.get('http://localhost:3000'+retAirlineIP + '/stripe/pubkey').success(function(pubkey){
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
              // service.openModal("Error occured during card verification: "+ response1.error);
              return;
            }
            var retToken = response1.id;

            //now ready to issue 2 post requests
            cb(outToken,retToken);
          });
        });
      }
      

      service.bookingRoundHandler=function(outToken, retToken){

        var outAirline   = service.outgoingFlight.Airline;
        var outAirlineIP = outAirline === "Alaska" ? "" : service.outgoingFlight.airlineIP;

        var retAirline   = service.returnFlight.Airline;
        var retAirlineIP = retAirline === "Alaska" ? "" : service.returnFlight.airlineIP;

        var outReq = angular.copy(service.data);
        outReq.paymentToken = outToken;
        outReq.returnFlightId = null;
        outReq.cost = service.outgoingFlight.cost;

        $http.post('http://localhost:3000'+outAirlineIP + '/booking', outReq).success(function (resOut){
          if(resOut.errorMessage){
            //couldn't charge the card
            // service.openModal(resOut.errorMessage);
            return;
          }
          confirmSrvc.bookingRefOut = resOut.refNum;
          confirmSrvc.airlineOut  = service.outgoingFlight.Airline;

          //modify for return
          var retReq = angular.copy(service.data);
          retReq.paymentToken     = retToken;
          retReq.outgoingFlightId = service.data.returnFlightId;
          retReq.returnFlightId   = null;
          retReq.cost = service.returnFlight.cost;

          $http.post('http://localhost:3000'+retAirlineIP + '/booking',retReq).success(function (resRet){
            if(resRet.errorMessage){
              //couldn't charge the card
              // service.openModal(resRet.errorMessage);
              return;
            }
            confirmSrvc.bookingRefRet = resRet.refNum;
            confirmSrvc.airlineRet = service.returnFlight.Airline;
            //done
            location.url('/confirm');
          });
        });
      }
      
      service.outHandler=function(cb1,cb2){
        var cardType      = service.payment.cardType;
        var cardNo        = service.payment.cardNo;
        var cvc           = service.payment.cvc;
        var expiryMonth   = service.payment.expiryMonth;
        var expiryYear    = service.payment.expiryYear;
        var returnFlight  = service.returnFlight;
        var outgoingFlight= service.outgoingFlight;

        var outAirline   = service.outgoingFlight.Airline;
        var outAirlineIP = outAirline === "Alaska" ? "" : service.outgoingFlight.airlineIP;
        console.log("outHandler called");
        $http.get('http://localhost:3000'+outAirlineIP + '/stripe/pubkey').success(function(pubkey){
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
              // service.openModal("Error occured during card verification: "+ response.error);
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
      
      service.roundHandler=function(){

        var cardType      = service.payment.cardType;
        var cardNo        = service.payment.cardNo;
        var cvc           = service.payment.cvc;
        var expiryMonth   = service.payment.expiryMonth;
        console.log("ba7awel"+expiryMonth);
        var expiryYear    = service.payment.expiryYear;

        var returnFlight  = service.returnFlight;
        var outgoingFlight= service.outgoingFlight;

        var airline   = returnFlight.Airline;
        var airlineIP = airline==="Alaska"? "" :returnFlight.airlineIP;
        // console.log("roundhandler abl http");
        $http.get('http://localhost:3000'+airlineIP + '/stripe/pubkey').success(function(pubkey){
          Stripe.setPublishableKey(pubkey);
          Stripe.card.createToken({
            number: cardNo,
            cvc: cvc,
            exp_month: expiryMonth,
            exp_year: expiryYear
          },
          service.roundSameAirline
        );
          // console.log("roundhandlergowa http");
      });
        // console.log("roundhandler barra http");
    }
    
    service.roundSameAirline =function (status, response){
      Stripe.setPublishableKey('pk_test_I5BoepTFhbNEZbcMq5eUeSRg');
      if (response.error) {
        // Problem!
        // service.openModal("Error occured during card verification: "+ response.error);
        console.log(response.error);
        return;
      }
      // Token was created!
      // Get the token ID:
      console.log("hallelujah");
      var token = response.id;
      var req = angular.copy(service.data);
      req.paymentToken     = token;
      req.cost = service.outgoingFlight.cost + service.returnFlight.cost;

      var airline   = service.returnFlight.Airline;
      var airlineIP = airline==="Alaska"? "" :returnFlight.airlineIP;

      $http.post('http://localhost:3000'+airlineIP + '/booking',req).success(function(res){
        if(res.errorMessage){
          //couldn't charge the card
          // service.openModal(res.errorMessage);
          console.log(res.errorMessage);
          return;
        }
        var bookingRef = res.refNum;
        confirmSrvc.bookingRefOut = res.refNum;
        confirmSrvc.bookingRefRet = null;
        $state.go('tabsController.findFlights.flights.passengerInfo.payment.confirmation');
      });

    


  }

    // openModal :  function(message){
    //   modalSrvc.modalMessage = message;
    //   var modalInstance = $uibModal.open({
    //     templateUrl: 'myModalContent.html',
    //     controller: 'ModalInstanceCtrl'
    //   });
    // }

  

});


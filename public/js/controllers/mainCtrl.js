angular.module('alaska')
.controller("mainCtrl", function($scope, $location,$http){
  $scope.goHome = function() {
    $location.url('/');
  };

  $scope.contact = function(){
    var contact={};
    contact.email=$scope.email;
    contact.message=$scope.message;
    $http.post('/api/contact',contact);
  }
  Stripe.setPublishableKey('pk_test_r6n2S6bon4uUQSxJufB0BinU');
  Stripe.card.createToken(
    {
      number: "4242424242424242",
      cvc: "100",
      exp_month: "09",
      exp_year: "2017"
    },function (status1, response1) {
      if(response1.error){
        // Problem!
        srvc.openModal("Error occured during card verification: "+ response1.error);
        return;
      }
      var retToken = response1.id;
      console.log(retToken);
    });
  });

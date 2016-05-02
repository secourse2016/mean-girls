angular.module('alaska')
.controller('paymentCtrl',function($scope,$location,masterSrvc,modalSrvc,$uibModal){
  $scope.clicked=false;
  $scope.validateForm =  function(){

    if($scope.paymentForm.$valid){
      return true;
    }
    else{
      $scope.clicked=true;
      return false;
    }

  };

  $scope.SubmitPayment = function() {
    var cardType=$scope.cardType;
    masterSrvc.payment.cardType=cardType;

    var cardNo=""+$scope.cardNo1+$scope.cardNo2+$scope.cardNo3+$scope.cardNo4;
    masterSrvc.payment.cardNo=cardNo;

    var expiryDate=$scope.expiryMonth+"-"+$scope.expiryYear; //mm-yy
    masterSrvc.payment.expiryDate=expiryDate;

    masterSrvc.payment.cardHolder=$scope.cardHolder;

    var cvc=$scope.cvc;
    masterSrvc.payment.cvc=cvc;

    var expiryMonth = $scope.expiryMonth;
    var expiryYear = $scope.expiryYear;

    Stripe.card.createToken({
      number: cardNo,
      cvc: cvc,
      exp_month: expiryMonth,
      exp_year: expiryYear
    },
    $scope.stripeHandler
  );
}

$scope.stripeHandler = function(status,response){
  if (response.error) { // Problem!

    //TODO show modal error occured
    $scope.openModal("Error occured during card verification.");

  }
  else { // Token was created!
    // Get the token ID:
    var token = response.id;
    masterSrvc.paymentToken = token;
    masterSrvc.Confirm();

  }
}
$scope.openModal= function(message){
  modalSrvc.modalMessage = message;
  var modalInstance = $uibModal.open({
    templateUrl: 'myModalContent.html',
    controller: 'ModalInstanceCtrl'
  });
}
});

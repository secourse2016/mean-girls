angular.module('alaskaIonic')
.controller('paymentCtrl',function($scope,$state,masterSrvc){
  $scope.SubmitPayment = function() {
    var cardType=$scope.cardType;
    masterSrvc.payment.cardType=cardType;

    var cardNo=""+$scope.cardNo1+$scope.cardNo2+$scope.cardNo3+$scope.cardNo4;
    masterSrvc.payment.cardNo=cardNo;

    var expiryDate=""+$scope.expiryMonth+"-"+$scope.expiryYear; //mm-yy
    masterSrvc.payment.expiryDate=expiryDate;
    masterSrvc.payment.expiryMonth= $scope.expiryMonth;
    console.log("filpayment"+$scope.expiryMonth);
    masterSrvc.payment.expiryYear= $scope.expiryYear;

    masterSrvc.payment.cardHolder=$scope.cardHolder;

    var cvc=$scope.cvc;
    masterSrvc.payment.cvc=cvc;

    masterSrvc.Confirm();
    // $state.go('tabsController.findFlights.flights.passengerInfo.payment.viewBooking');
  }
});

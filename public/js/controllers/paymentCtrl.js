angular.module('alaska')
.controller('paymentCtrl',function($scope,$location,masterSrvc){
  $scope.SubmitPayment = function() {
    var cardType=$scope.cardType;
    masterSrvc.payment.cardType=cardType;

    var cardNo=""+$scope.cardNo1+$scope.cardNo2+$scope.cardNo3+$scope.cardNo4;
    masterSrvc.payment.cardNo=cardNo;

    var expiryDate=""+$scope.expiryMonth+$scope.expiryYear; //mm-yy
    masterSrvc.payment.expiryDate=expiryDate;

    var cardHolder=$scope.cardHolder;
    masterSrvc.payment.cardHolder=cardHolder;

    var ccv=$scope.ccv;
    masterSrvc.payment.ccv=ccv;


    masterSrvc.Confirm();
  }
});

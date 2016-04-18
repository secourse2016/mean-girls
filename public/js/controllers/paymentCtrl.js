angular.module('alaska')
.controller('paymentCtrl',function($scope,$location,masterSrvc){
  $scope.SubmitPayment = function() {
    var cardType=$scope.cardType;
    masterSrvc.payment.cardType=cardType;

    var cardNo=$scope.cardNo;
    masterSrvc.payment.cardNo=cardNo;

    var expiryDate=$scope.expiryDate;
    masterSrvc.payment.expiryDate=expiryDate;

    var cardHolder=$scope.cardHolder;
    masterSrvc.payment.cardHolder=cardHolder;

    var ccv=$scope.ccv;
    masterSrvc.payment.ccv=ccv;


    masterSrvc.Confirm();
});

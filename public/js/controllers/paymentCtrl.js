angular.module('alaska')
.controller('paymentCtrl',function($scope,$location,masterSrvc){
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

    var expiryDate=""+$scope.expiryMonth+"-"+$scope.expiryYear; //mm-yy
    masterSrvc.payment.expiryDate=expiryDate;

    masterSrvc.payment.cardHolder=$scope.cardHolder;

    var ccv=$scope.ccv;
    masterSrvc.payment.ccv=ccv;


    masterSrvc.Confirm();
  }
});

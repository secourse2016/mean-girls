angular.module('alaska')
.controller("passengerCtrl", function($scope,$location,masterSrvc){
  $scope.passenger={};
  masterSrvc.passenger={};
  masterSrvc.payment={};
  $scope.clicked=false;
  $scope.validateForm =  function(){

    if($scope.passengerForm.$valid){
      return true;
    }
    else{
      $scope.clicked=true;
      return false;
    }

  };
  $scope.SubmitInfo = function() {

    var firstName=$scope.passenger.firstName;
    masterSrvc.passenger.firstName=firstName;

    var lastName=$scope.passenger.lastName;
    masterSrvc.passenger.lastName=lastName;

    var birthDay  =$scope.passenger.birthDay;
    var birthMonth=$scope.passenger.birthMonth;
    var birthYear =$scope.passenger.birthYear;
    var birthDate =birthYear+'-'+birthMonth+'-'+birthDay;

    masterSrvc.passenger.dateOfBirth=new Date(birthDate).getTime();

    var gender    =$scope.passenger.gender;
    masterSrvc.passenger.gender=gender;

    var passportCountry=$scope.passenger.passportCountry;
    masterSrvc.passenger.nationality=passportCountry;

    var passportNo=$scope.passenger.passportNo;
    masterSrvc.passenger.passportNum=passportNo;

    var issueDay=$scope.passenger.issueDay;
    var issueMonth=$scope.passenger.issueMonth;
    var issueYear=$scope.passenger.issueYear;
    var issueDate=issueYear+'-'+issueMonth+'-'+issueDay;
    masterSrvc.passenger.passportIssueDate=issueDate;

    var expiryDay=$scope.passenger.expiryDay;
    var expiryMonth=$scope.passenger.expiryMonth;
    var expiryYear=$scope.passenger.expiryYear;
    var expiryDate=expiryYear+'-'+expiryMonth+'-'+expiryDay;
    masterSrvc.passenger.passportExpiryDate=expiryDate;

    $location.url('/payment');

  };

});

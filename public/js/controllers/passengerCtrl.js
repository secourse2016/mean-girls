angular.module('alaska')
.controller("passengerCtrl", function($scope,$location,masterSrvc){
  $scope.passenger={};
  masterSrvc.passenger={};
  masterSrvc.payment={};
  $scope.SubmitInfo = function() {

    var firstName=$scope.passenger.firstName;
    masterSrvc.passenger.firstName=firstName;

    var lastName=$scope.passenger.lastName;
    masterSrvc.passenger.lastName=lastName;

    var birthDay=$scope.passenger.birthDay;
    var birthMonth=$scope.passenger.birthMonth;
    var birthYear=$scope.passenger.birthYear;
    var birthDate=birthYear+'-'+birthMonth+'-'+birthDay;
    masterSrvc.passenger.birthDate=birthDate;

    var gender=$scope.passenger.gender;
    masterSrvc.passenger.gender=gender;

    var passportCountry=$scope.passenger.passportCountry;
    masterSrvc.passenger.passportCountry=passportCountry;

    var passportNo=$scope.passenger.passportNo;
    masterSrvc.passenger.passportNo=passportNo;

    var issueDay=$scope.passenger.issueDay;
    var issueMonth=$scope.passenger.issueMonth;
    var issueYear=$scope.passenger.issueYear;
    var issueDate=issueYear+'-'+issueMonth+'-'+issueDay;
    masterSrvc.passenger.issueDate=issueDate;

    var expiryDay=$scope.passenger.expiryDay;
    var expiryMonth=$scope.passenger.expiryMonth;
    var expiryYear=$scope.passenger.expiryYear;
    var expiryDate=expiryYear+'-'+expiryMonth+'-'+expiryDay;
    masterSrvc.passenger.expiryDate=expiryDate;

    $location.url('/payment');

  };
});

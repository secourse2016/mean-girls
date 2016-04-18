angular.module('alaska')
.controller("passengerCtrl", function($scope,$location,masterSrvc){

  $scope.passenger.SubmitInfo = function() {

    var firstName=$scope.passenger.firstName;
    masterSrvc.passenger.firstName=firstName;

    var lastName=$scope.passenger.lastName;
    masterSrvc.passenger.lastName=lastName;

    var birthDate=$scope.passenger.birthDate;
    masterSrvc.passenger.birthDate=birthDate;

    var gender=$scope.passenger.gender;
    masterSrvc.passenger.gender=gender;

    var passportCountry=$scope.passenger.passportCountry;
    masterSrvc.passenger.passportCountry=passportCountry;

    var passportNo=$scope.passenger.passportNo;
    masterSrvc.passenger.passportNo=passportNo;

    var issueDate=$scope.passenger.issueDate;
    masterSrvc.passenger.issueDate=issueDate;

    var expiryDate=$scope.passenger.expiryDate;
    masterSrvc.passenger.expiryDate=expiryDate;

    $location.url('/payment');

  };
});

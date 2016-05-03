angular.module('alaska').controller(function($scope,confirmSrvc,flightsSrvc){
  $scope.refNumOut = confirmSrvc.bookingRefOut;
  $scope.refNumRet = confirmSrvc.bookingRefRet;
  $scope.airlineOut = confirmSrvc.airlineOut;
  $scope.airlineRet =confirmSrvc.airlineRet;
  $scope.origin =flightsSrvc.origin;
  $scope.destination=flightsSrvc.destination;

});

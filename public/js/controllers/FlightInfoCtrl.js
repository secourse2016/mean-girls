
angular.module('alaska').
controller('flightInfoCtrl',function($scope, $http,flightInfoSrvc){
  $scope.flight=flightInfoSrvc.flight;
});

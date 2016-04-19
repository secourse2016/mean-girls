angular.module('alaska')
.controller("passengerCtrl", function($scope,$location){

  $scope.SubmitInfo = function() {
    $location.url('/payment');

  };
});

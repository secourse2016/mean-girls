angular.module('alaska').controller("SubmitCtr", function($scope,$location){

  $scope.SubmitInfo = function() {
    $location.url('/payment');

  };
});
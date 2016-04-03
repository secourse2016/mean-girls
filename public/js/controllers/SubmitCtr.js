angular.module('alaska').controller("SubmitCtr", function($scope){

  $scope.SubmitInfo = function() {
    $location.url('/payment');

  }
}
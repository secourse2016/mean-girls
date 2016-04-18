angular.module('alaska')
.controller("submitCtrl", function($scope,$location){

  $scope.SubmitInfo = function() {
    $location.url('/payment');

  };
});

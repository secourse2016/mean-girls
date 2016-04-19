angular.module('alaska')
.controller("mainCtrl", function($scope, $location){
  $scope.goHome = function() {
    $location.url('/');
  };

});

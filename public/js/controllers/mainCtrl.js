angular.module('alaska')
.controller("mainCtrl", function($scope, $location,$http){
  $scope.goHome = function() {
    $location.url('/');
  };

  $scope.contact = function(){
    var contact={};
    contact.email=$scope.email;
    contact.message=$scope.message;
    $http.post('/api/contact',contact);
  }
});

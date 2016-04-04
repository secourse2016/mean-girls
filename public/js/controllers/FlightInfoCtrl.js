
angular.module('alaska').
controller('flightInfoCtrl',function($scope, $http){

  $http.get('dummyData/flights.json').success(function(data){
    $scope.infos = data;
  });
});

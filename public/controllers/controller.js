(function(){
    var app = angular.module('Alaska',[]);

    app.controller('FlightController',['$scope','$http',function($scope, $http){

      $http.get('dummyData/flights.json').success(function(data){
        $scope.infos = data;
      });
    }]);
})();
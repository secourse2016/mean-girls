(function(){
    // var app = angular.module('alaska',[]);

    app.controller('FlightInfoCtrl',['$scope','$http',function($scope, $http){

      $http.get('dummyData/flights.json').success(function(data){
        $scope.infos = data;
      });
    }]);
})();
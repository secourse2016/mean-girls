
(function(){
	var app = angular.module('alaska',[ ]);

	app.controller('FlightController',['$scope','$http',function($scope, $http){
		$http.get('dummyData/flights2.json').success(function(data){
			$scope.infos = data;

		});

		$scope.infoFlightNo = { index: null };

		$scope.Continue = function (){
			$location.url('/passengerInfo');
		}

	}]);

})();


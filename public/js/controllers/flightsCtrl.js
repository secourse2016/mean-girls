
(function(){
	// var app = angular.module('alaska',[ ]);

	app.controller('FlightController',function($scope, $http,$location){
		$http.get('dummyData/flights2.json').success(function(data){
			$scope.infos = data;

		});

		$scope.infoFlightNo = { index: null };

		$scope.Continue = function (){
			$location.url('/passengerInfo');
		}

	});

})();



(function(){
	// var app = angular.module('alaska',[ ]);

	app.controller('flightsCtrl',function($scope, $http,$location){
		$http.get('dummyData/flights.json').success(function(data){
			$scope.infos = data;

		});

		$scope.infoFlightNo = { index: null };

		$scope.Continue = function (){
			$location.url('/passengerInfo');
		}

	});

})();

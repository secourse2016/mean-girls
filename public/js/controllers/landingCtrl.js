

angular.module('alaska').controller('landingCtrl', function ($scope){
	$scope.formInfo=[];

	$scope.findFlightsButtonClick = function(form) {
		$scope.formInfo=form;

		new setFindFlightInfo(form);

		$location.url( '/flights');
 	}


});
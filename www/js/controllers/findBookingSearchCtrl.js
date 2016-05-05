angular.module('alaskaIonic')
.controller("findBookingSearchCtrl", function($scope,$state,$http,bookingSrvc,modalSrvc){
	
	$scope.showBooking = function() {
		var bookingRef=$scope.bookingRef;
		if(!bookingRef){
			// $scope.openModal("Please fill in a booking reference.");
			return;
		}
		$http.get('http://localhost:3000/api/booking/'+bookingRef+'?wt='+token).success(function(booking){
			if(!booking){
				// $scope.openModal("We couldn't find that booking.");
				return;
			}
			bookingSrvc.booking=booking;
			 $state.go('tabsController.findBookingSearch.viewBooking');
		});
	};

	// $scope.openModal= function(message){
	// 	modalSrvc.modalMessage = message;
	// 	var modalInstance = $uibModal.open({
	// 		templateUrl: 'myModalContent.html',
	// 		controller: 'ModalInstanceCtrl'
	// 	});
	// }
});

// angular.module('alaskaIonic').factory('modalSrvc',function(){
// 	this.modalMessage="";
// 	return{

// 	}
// });

// angular.module('alaskaIonic').controller('ModalInstanceCtrl', function ($scope, $uibModalInstance,modalSrvc) {

// 	$scope.modalMessage=modalSrvc.modalMessage;
// 	$scope.ok = function () {
// 		$uibModalInstance.close();
// 	};

// });







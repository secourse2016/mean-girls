angular.module('alaska')
.controller("bookingCtrl", function($scope,$routeParams,resvConfirmSrvc){
	resvConfirmSrvc.getResv($routeParams.id, function(reservation){
		$scope.resv = reservation;
		var oneWay = resvConfirmSrvc.isOneWay();
		$scope.oneWay = oneWay;
		resvConfirmSrvc.getoutgoingFlight(function(outgoingFlight){
			$scope.outFlight = outgoingFlight;
			resvConfirmSrvc.getoriginAirpot(outgoingFlight, function(originOut){
				$scope.outOrigin = originOut;
				resvConfirmSrvc.getdestAirpot(outgoingFlight, function(destOut){
					$scope.outDest = destOut;
					resvConfirmSrvc.getseat(outgoingFlight , function (outSeat) {
						$scope.outSeat  = outSeat;
						if(! oneWay){
							resvConfirmSrvc.getreturnFlight(function(returnFlight){
								$scope.retFlight = returnFlight;
								resvConfirmSrvc.getoriginAirpot(returnFlight, function(originRet){
									$scope.retOrigin = originRet;
									resvConfirmSrvc.getdestAirpot(returnFlight, function(destRet){
										$scope.retDest = destRet;

										resvConfirmSrvc.getseat(returnFlight, function(seatRet){
											$scope.retSeat = seatRet;

										});
									});
								});
							});
						}
					});
				});
			});
		});
	});
});

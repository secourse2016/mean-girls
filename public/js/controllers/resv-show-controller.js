angular.module('alaska')
.controller("ResvShowController", function($scope,$routeParams,resvSrvc){
	resvSrvc.getResv($routeParams.id, function(reservation){
		$scope.resv = reservation;
		var oneWay = resvSrvc.isOneWay();
		$scope.oneWay = oneWay;
		resvSrvc.getoutgoingFlight(function(outgoingFlight){
			$scope.outFlight = outgoingFlight;
			resvSrvc.getoriginAirpot(outgoingFlight, function(originOut){
				$scope.outOrigin = originOut;
				resvSrvc.getdestAirpot(outgoingFlight, function(destOut){
					$scope.outDest = destOut;
					resvSrvc.getseat(outgoingFlight , function (outSeat) {
						$scope.outSeat  = outSeat;
						if(! oneWay){
							resvSrvc.getreturnFlight(function(returnFlight){
								$scope.retFlight = returnFlight;
								resvSrvc.getoriginAirpot(returnFlight, function(originRet){
									$scope.retOrigin = originRet;
									resvSrvc.getdestAirpot(returnFlight, function(destRet){
										$scope.retDest = destRet;

										resvSrvc.getseat(returnFlight, function(seatRet){
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

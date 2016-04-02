angular.module('alaska')
.controller("ResvShowController", function($scope,$routeParams,resvSrvc){

	resvSrvc.getResv($routeParams.id, function(reservation){
		$scope.resv = reservation;
		resvSrvc.getoutgoingFlight(function(outgoingFlight){
			$scope.outFlight = outgoingFlight;
			resvSrvc.getreturnFlight(function(returnFlight){
				$scope.retFlight = returnFlight;
					resvSrvc.getoriginAirpot(outgoingFlight, function(originOut){
						$scope.outOrigin = originOut;
						resvSrvc.getdestAirpot(outgoingFlight, function(destOut){
							$scope.outDest = destOut;
							resvSrvc.getoriginAirpot(returnFlight, function(originRet){
								$scope.retOrigin = originRet;
								resvSrvc.getdestAirpot(returnFlight, function(destRet){
									$scope.retDest = destRet;
									resvSrv.getseat(outgoingFlight , function (outSeat) {
										$scope.outSeat  = outSeat;
										resvSrv.getseat(returnFlight, function(seatRet){
											$scope.retSeat = seatRet;
										})
									})
								});
							});
						});
				});
			});
		});
	});
});

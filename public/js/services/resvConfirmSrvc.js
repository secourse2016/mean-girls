angular.module('alaska')
.factory("resvConfirmSrvc", function ($http){
	return {
		getResv : function(resvNo,cb){
			var resv;
			var factory=this;
			$http.get('dummyData/bookings.json').success(function(bookings){
					for(var i=0 ; i<bookings.length ; i++){
						if(bookings[i].reservationID == resvNo){
							resv = bookings[i];
							factory.booking=resv;
							break;
						}
					}
					cb(resv);
			}
		);
		},
		getoutgoingFlight : function(cb){
			//get outgoing flight of current booking
			var factory = this;
			$http.get('dummyData/flights.json').success(function(flights){
				var flight;
				for(var i=0 ; i<flights.length ; i++){
					if(flights[i].flightNumber == factory.booking.outgoingFlight){
						flight = flights[i];
						break;
					}
				}
				cb(flight);
			})
		},
		getreturnFlight : function(cb){
			//get return flight of current booking
			var factory = this;
			$http.get('dummyData/flights.json').success(function(flights){
				var flight;
				for(var i=0 ; i<flights.length ; i++){
					if(flights[i].flightNumber == factory.booking.returnFlight){
						flight = flights[i];
						break;
					}
				}
				cb(flight);
			});
		},

		getoriginAirpot : function(flight,cb){
			$http.get('dummyData/airports.json').success(function(airports){
				var airport;
				for (var i = 0; i < airports.length; i++) {
					this.get
					if(airports[i].iata == flight.origin){
						airport = airports[i];
						break;
					}
				}
				cb(airport);
			});

		},
		getdestAirpot : function(flight,cb){
			$http.get('dummyData/airports.json').success(function(airports){
				var airport;
				for (var i = 0; i < airports.length; i++) {
					this.get
					if(airports[i].iata == flight.destination){
						airport = airports[i];
						break;
					}
				}
				cb(airport);
			});

		}
		,
		getseat : function(flight, cb){
			var seat;
			var cabin;
			var factory=this;
			for (var i = 0; i < flight.seatmap.length; i++) {
				if(flight.seatmap[i].reservationID == factory.booking.reservationID){
					seat = flight.seatmap[i];
					break;
				}
			}
			cb(seat);
		},

		isOneWay : function(){
			return this.booking.oneWay;
		}
	}
});

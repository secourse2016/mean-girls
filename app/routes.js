var db = require('../db.js');
var path = require('path');
var moment = require('moment');

var routes = function(app) {
	app.get('/', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/index.html'));
	});

	app.get('/404', function(req, res){
		res.sendFile(path.join(__dirname + '/../public/404.html'));
	});

	app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class', function(req, res) {
		var params = {};
		var reqClass = req.params['class'];
		params.origin = req.params['origin'];
		params.destination = req.params['destination'];
		params.departingDate = req.params['departingDate'] 
		params.returningDate = req.params['returningDate'] 
		params.class = req.params['class'];
		db.searchRoundTripFlight(params,function(result){
			db.formatData(result,reqClass,function(finalresult){
				res.send(finalresult);
			});
		});
	});

	app.get('/db/seed', function(req, res) {
		db.seedFlights(function(err){
        	if(err) return res.send(err);
        	console.log("flights seeded");
        	db.seedAirports(function(err,seeded){
		    	if (err) return res.send(err);
	        	if(seeded) {
	        		console.log("seeded yay");
	        		res.send("Success");
	        	}
	        	else {
	        		console.log("already seeded !");	        	
	        		res.send("Seeded");
	        	}
	    	});
        });
    }); 

        app.get('/api/flight/:flightNo', function(req,res){
        var flightNumber = req.params['flightNo'];
    	dbFunctions.searchFlight(flightNumber,function(err,flight){
    		res.send(flight[0]);
    	});
  
    });

    app.get('/api/booking/:bookingRef', function(req,res){
        var bookingRefNo = req.params['bookingRef'];
		db.searchBooking(bookingRefNo,function(err,booking){

            var outFlight=booking[0].outgoingFlight;

            db.searchFlight(outFlight,function(err,Outflight){
                booking[0].outgoingFlight=Outflight[0];
                var resvID=booking[0].reservationID;

                Outflight[0].seatmap.find({"reservationID":resvID},function(err,cursor){
					var seatMap = cursor.toArray()[0];
					var seat = seatMap.seatNumber;
					var cabinClass = seatMap.cabin;
					var cost = seatMap.cost;

					booking[0].outgoingFlight.seatNumber = seat;
					booking[0].outgoingFlight.class = cabinClass;
					booking[0].outgoingFlight.cost = cost;

					var retFlight=booking[0].returnFlight;
	                if(retFlight != null){
	                    db.searchFlight(retFlight,function(err,Retflight){
	                        booking[0].returnFlight=Retflight[0];

	                        Retflight[0].seatmap.find({"reservationID":resvID},function(err,cursor){
								var returnseatMap = cursor.toArray()[0];
								var returnSeat = returnseatMap.seatNumber;
								var returnCabinClass = returnseatMap.cabin;
								var returnCost = returnseatMap.cost;

								booking[0].returnFlight.seat = returnSeat;
								booking[0].returnFlight.class = returnCabinClass;
								booking[0].returnFlight.cost = returnCost;

	                       		res.send(booking[0]);
	                    	});
	                    });
	                }
	                else{
	                    res.send(booking[0]);
	                }


				});


                
            });
            
			
		});
  
    });

    app.get('/api/airports', function(req,res){
        db.getAirports(function(err, airports){
            res.send(airports);
        });
    });

}

module.exports = routes;


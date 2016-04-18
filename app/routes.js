 var dbFunctions=require('../db.js');

 module.exports = function(app) {

    app.get('/api/flight/:flightNo', function(req,res){
        var flightNumber = req.params['flightNo'];
    	dbFunctions.searchFlight(flightNumber,function(err,flight){
    		res.send(flight);
    	});
  
    });

    app.get('/api/booking/:bookingRef', function(req,res){
        var bookingRefNo = req.params['bookingRef'];
		dbFunctions.searchBooking(bookingRefNo,function(err,booking){

            var outFlight=booking[0].outgoingFlight;

            dbFunctions.searchFlight(outFlight,function(err,Outflight){
                booking[0].outgoingFlight=Outflight;
                var retFlight=booking[0].returnFlight;
                if(retFlight != null){
                    dbFunctions.searchFlight(retFlight,function(err,Retflight){
                        booking[0].returnFlight=Retflight;
                        res.send(booking);
                    });
                }
                else{
                    res.send(booking);
                }
                
            });
            
			
		});
  
    });

    app.get('/api/airports', function(req,res){
        dbFunctions.getAirports(function(err, airports){
            res.send(airports);
        });
    });
};
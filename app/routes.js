 var dbFunctions=require('../db.js');

 module.exports = function(app) {

    app.get('/api/flight/:flightNo', function(req,res){
    	db.searchFlight(flightNo,function(err,flight){
    		res.send(flight);
    	});
  
    });

    app.get('/api/booking/:bookingRef', function(req,res){
		db.searchBooking(bookRef,function(err,booking){
			res.send(booking);
		});
  
    });
};
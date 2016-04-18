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
}

module.exports = routes;

module.exports = function(app) {

	var jwt     = require('jsonwebtoken');
	var express = require('express');
	var jwt     = require('jsonwebtoken');
	var db      = require('../db.js');
	var moment  = require('moment');
	var path    = require('path');
	var jwtexp  =require('express-jwt')
	var airlinesIP = require('../json/otherAirlines.json');

	app.use(jwtexp({
		secret: 'CSEN603ROCKSi<8SE!',
		getToken: function(req) {
			if (req.headers && req.headers['x-access-token']) {
				return req.headers['x-access-token'];
			}
			return null;
		}
	}));

	app.get('/', function (req, res) {
		res.sendFile(path.join(__dirname, '../public', 'index.html'));
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

	app.get('/db/delete', function(req, res) {
		db.clearDB(function(err){
			if (err) return res.send(err);
			res.send("db cleared !")
		});
	});


	app.use(function(req, res, next) {

		// check header or url parameters or post parameters for token
		var token = req.body.wt || req.query.wt || req.headers['x-access-token'];

		console.log("{{{{ TOKEN }}}} => ", token);

		var jwtSecret = process.env.JWTSECRET;

		// Get JWT contents:
		try
		{
			var payload = jwt.verify(token, jwtSecret);
			req.payload = payload;
			next();
		}
		catch (err)
		{
			console.error('[ERROR]: JWT Error reason:', err);
			res.status(403).sendFile(path.join(__dirname, '../public', '403.html'));
		}

	});



	app.post('/api/addbooking',function(req,res){
		var information = req.payload;
		db.addBooking(information,function(err,booking){
			if (err) return (err);
			res.send(booking);
		});
	});

	app.get('/api/airports', function(req,res){
		db.getAirports(function(err, airports){
			res.send(airports);
		});
	});

	app.get('/api/flight/:flightNo', function(req,res){
		var flightNumber = req.params['flightNo'];
		db.searchFlight(flightNumber,function(err,flight){
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
				var seatMap=outgoingFlight[0].seatmap;
				var outSeat;
				for (var i = seatMap.length - 1; i >= 0; i--) {
					if(seatMap[i].reservationID===resvID){
						outSeat=seatMap[i];
						break;
					}
				}
				var seatNumber = outSeat.seatNumber;
				var cabinClass = outSeat.cabin;
				var cost = outSeat.cost;

				booking[0].outgoingFlight.seatNumber = seatNumber;
				booking[0].outgoingFlight.class = cabinClass;
				booking[0].outgoingFlight.cost = cost;

				var retFlight=booking[0].returnFlight;

				if(retFlight != null){
					db.searchFlight(retFlight,function(err,Retflight){
						booking[0].returnFlight=Retflight[0];
						var returnseatMap=Retflight[0].seatmap;
						var returnSeat;
						for (var i = returnseatMap.length - 1; i >= 0; i--) {
							if(returnseatMap[i].reservationID===resvID){
								returnSeat=returnseatMap[i];
								break;
							}
						}
						var returnSeatNumber = returnSeat.seatNumber;
						var returnCabinClass = returnSeat.cabin;
						var returnCost = returnSeat.cost;

						booking[0].returnFlight.seat = returnSeatNumber;
						booking[0].returnFlight.class = returnCabinClass;
						booking[0].returnFlight.cost = returnCost;

						res.send(booking[0]);
					});
				}
				else{
					res.send(booking[0]);
				}

			});


		});

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

	app.get('/api/flights/search/:origin/:destination/:departingDate/:class', function(req, res) {
		var originValue = req.params['origin'];
		var destinationValue = req.params['destination'];
		var departingDateValue = req.params['departingDate'];
		var classValue = req.params['class'];

		var info={ "origin"        : originValue ,
		"destination"   : destinationValue ,
		"departureDate" : departingDateValue ,
		"class"         : classValue
	};

	db.searchFlightsOneWay(info, function (err, flights) {
		if (err) return next(err);
		res.send(flights);
	});

});

//new code other airlines

app.get('/api/other/flights/search/:origin/:destination/:departingDate/:class', function(req1,res1){
	const async = require('async');
	const request = require('request');
	var result=[];

	function httpGet(url, callback) {
		const options = {
			url :  url + '/api/flights/search/:origin/:destination/:departingDate/:class'
		};
		request(options, function(err, res, body) {
			callback(err, body);
		});
	}

	const urls= require('../json/otherAirlines.json');

	async.map(urls, httpGet, function (err, res){
		result.push(res.outgoingFlights);
		// res1.send(//the result);
	});
	var Finalresult={ "outgoingFlights" : result};
	res1.send( Finalresult);
});


app.get('/api/other/flights/search/:origin/:destination/:departingDate/:returningDate/:class', function(req1,res1){

	const async = require('async');
	const request = require('request');
	var outgoing=[];
	var returning=[];
	function httpGet(url, callback) {
		const options = {
			url :  url + '/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class'
		};
		request(options, function(err, res, body) {
			callback(err, body);
		});
	}

	const urls= require('../json/otherAirlines.json');

	async.map(urls, httpGet, function (err, res){
		outgoing.push(res.outgoingFlights);
		returning.push(res.returnFlights);
		// res1.send(//the result);
	});

	var Finalresult={ "outgoingFlights" : outgoing,"returnFlights":returning};
	res1.send( Finalresult);
});


};



// var routes = function(app) {
// 	app.get('/', function(req, res){
// 		res.sendFile(path.join(__dirname + '/../public/index.html'));
// 	});

// 	app.get('/404', function(req, res){
// 		res.sendFile(path.join(__dirname + '/../public/404.html'));
// 	});

// }

// module.exports = routes;

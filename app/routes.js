
module.exports = function(app) {

	var jwt     = require('jsonwebtoken');
	var express = require('express');
	var jwt     = require('jsonwebtoken');
	var db      = require('../db.js');
	var moment  = require('moment');
	var path    = require('path');
	var jwtexp  =require('express-jwt')
	var airlinesIP = require('../json/otherAirlines.json');
	var stripe = require('stripe')('sk_test_Jac7wnEea4OaV9T29UOPDyMd');


	app.use(function (req, res, next) {
		res.setHeader('Access-Control-Allow-Methods', 'GET', 'POST', 'OPTIONS', 'PUT', 'DELETE');
		res.setHeader('Access-Control-Allow-Origin', '*');
		res.setHeader('Content-Type','application/json');
		next();
	});
	app.get('/stripe/pubkey', function (req,res) {
		res.json('pk_test_I5BoepTFhbNEZbcMq5eUeSRg');
	});
	app.post('/booking', function(req, res) {

		// retrieve the token
		var stripeToken = req.body.paymentToken;
		console.log(stripeToken);
		var flightCost  = parseInt(req.body.cost) * 100;
		// attempt to create a charge using token
		stripe.charges.create({
			amount: flightCost,
			currency: "usd",
			source: stripeToken,
			description: "test"
		}, function(err, data) {
			if (err) res.send({ refNum: null, errorMessage: "Error occured while charging: "+ err});
			else{
				var information = req.body;
				console.log(information);
				db.addBooking(information,function(error,refNum){
					if (!error) res.send({ refNum: refNum, errorMessage: null});
					else console.log(error);
				});
			}
		});
	});



	app.get('/', function (req, res) {
		res.sendFile(path.join(__dirname, '../public', 'index.html'));
	});

	app.get('/db/seed', function(req, res) {
		db.seedFlights(function(err){
			if(err) return res.send(err);
			db.seedAirports(function(err,seeded){
				if (err) return res.send(err);
				if(seeded) {
					res.send("Success");
				}
				else {
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


		var jwtSecret = 'CSEN603ROCKSi<8SE';

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


	app.post('/api/contact', function(req,res){
		var contact=req.body;
		db.contact(contact,function(err){
			if(err)
			console.log(err);
		});
	});


	app.get('/api/booking/:bookingRef', function(req,res){
		var bookingRefNo = req.params['bookingRef'];
		db.searchBooking(bookingRefNo,function(err,booking){
			if(booking.length===0){
				res.send(undefined);
				return;
			}

			var outFlight=booking[0].outgoingFlightID;

			db.searchFlight(outFlight,function(err,Outflight){
				booking[0].outgoingFlightID=Outflight[0];
				var resvID=booking[0].reservationID;
				var seatMap=Outflight[0].seatmap;
				var outSeat;
				//TODO adjust seatmap to handle several passengers!!
				for (var i = 0; i < seatMap.length; i++) {
					if(seatMap[i].reservationID===resvID){
						outSeat=seatMap[i];
						console.log("found it");
						break;

					}
				}
				var seatNumber = outSeat.seatNumber;
				var cabinClass = outSeat.cabin;
				var cost = outSeat.cost;

				booking[0].outgoingFlightID.seatNumber = seatNumber;
				booking[0].outgoingFlightID.class = cabinClass;
				booking[0].outgoingFlightID.cost = cost;

				var retFlight=booking[0].returnFlightID;

				if(retFlight != null){
					db.searchFlight(retFlight,function(err,Retflight){
						booking[0].returnFlightID=Retflight[0];
						var returnseatMap=Retflight[0].seatmap;
						var returnSeat;
						for (var i = 0; i < returnseatMap.length; i++) {
							if(returnseatMap[i].reservationID===resvID){
								returnSeat=returnseatMap[i];
								break;
							}
						}
						var returnSeatNumber = returnSeat.seatNumber;
						var returnCabinClass = returnSeat.cabin;
						var returnCost = returnSeat.cost;

						booking[0].returnFlightID.seatNumber = returnSeatNumber;
						booking[0].returnFlightID.class = returnCabinClass;
						booking[0].returnFlightID.cost = returnCost;

						res.send(booking[0]);
					});
				}
				else{
					res.send(booking[0]);
				}

			});


		});

	});
	app.get('/api/flights/search/:origin/:destination/:departingDate/:class/:seats', function(req, res) {
		var originValue = req.params['origin'];
		var destinationValue = req.params['destination'];
		var departingDateValue = req.params['departingDate'];
		var classValue = req.params['class'];
		var seatsValue = req.params['seats'];

		var info={
			"origin"        : originValue ,
			"destination"   : destinationValue ,
			"departureDate" : departingDateValue ,
			"class"         : classValue,
			"seats"         : seatsValue
		};

		db.searchFlightsOneWay(info, function (err, flights) {
			if (err) return next(err);
			res.send(flights);
		});

	});

	app.get('/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class/:seats', function(req, res) {
		var params = {};
		var reqClass = req.params['class'];
		params.origin = req.params['origin'];
		params.destination = req.params['destination'];
		params.departingDate = req.params['departingDate']
		params.returningDate = req.params['returningDate']
		params.class = req.params['class'];
		params.seats = req.params['seats'];
		db.searchRoundTripFlight(params,function(result){
			db.formatData(result,reqClass,function(finalresult){
				res.send(finalresult);
			});
		});
	});


	// app.post('/booking', function(req, res) {
	//
	// 	// retrieve the token
	// 	var stripeToken = req.body.paymentToken;
	// 	var flightCost  = req.body.cost * 100;
	//
	// 	// attempt to create a charge using token
	// 	stripe.charges.create({
	// 		amount: flightCost,
	// 		currency: "usd",
	// 		source: stripeToken,
	// 		description: "test"
	// 	}, function(err, data) {
	// 		if (err) res.send({ refNum: null, errorMessage: "Error occured while charging!"});
	// 		else{
	// 			var information = req.body;
	// 			db.addBooking(information,function(err,refNum){
	// 				if (!err) res.send({ refNum: refNum, errorMessage: null});
	// 			});
	// 		}
	// 	});
	// });
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


	//new code other airlines

	app.get('/api/other/flights/search/:origin/:destination/:departingDate/:class/:seats', function(req1,res1){
		const async = require('async');
		const request = require('request');
		var result=[];
		var originValue = req1.params['origin'];
		var destinationValue = req1.params['destination'];
		var departingDateValue = req1.params['departingDate'];
		var classValue = req1.params['class'];
		var seatsValue = req1.paramas['seats'];

		function httpGet(url, callback) {
			var secret = 'CSEN603ROCKSi<8SE!';
			var token = jwt.sign({},'CSEN603ROCKSi<8SE!');
			var decoded = jwt.verify(token, 'CSEN603ROCKSi<8SE!');

			const options = {
				port:80,
				method:'GET',
				json:true,
				url :  url + '/api/flights/search/'+originValue+'/'+destinationValue+'/'+departingDateValue+'/'+classValue+'/'+seatsValue+'?wt='+token
			};
			request(options, function(err, res, body) {
				callback(err, body);
			});
		}

		const urls=  [
			"54.191.202.17",
			"ec2-52-90-41-197.compute-1.amazonaws.com"
		];

		async.map(urls, httpGet, function (err, res){

			console.log( res);
			console.log("res length"+res.length);
			for(var i=0;i<res.length;i++)
			{
				result.push(res[i].outgoingFlights);
			}
			var finalresult = {"outgoingFlights":result};
			res1.send(finalresult);

		});
	});

	app.get('/api/other/flights/search/:origin/:destination/:departingDate/:returningDate/:class/:seats', function(req1,res1){

		const async = require('async');
		const request = require('request');
		var outgoing=[];
		var returning=[];
		var originValue = req1.params['origin'];
		var destinationValue = req1.params['destination'];
		var departingDateValue = req1.params['departingDate'];
		var returningDateValue = req1.params['returningDate'];
		var classValue = req1.params['class'];
		var seatsValue = req1.paramas['seats'];

		function httpGet(url, callback) {
			var secret = 'CSEN603ROCKSi<8SE!';
			var token = jwt.sign({},'CSEN603ROCKSi<8SE!');
			var decoded = jwt.verify(token, 'CSEN603ROCKSi<8SE!');
			const options = {
				port:80,
				method:'GET',
				json:true,
				url :  url + '/api/flights/search/'+originValue+'/'+destinationValue+'/'+departingDateValue+'/'+returningDateValue+'/'+classValue+'/'+seatsValue+'?wt='+token
			};
			request(options, function(err, res, body) {
				callback(err, body);
			});
		}

		const urls= [
			"54.191.202.17",
			"ec2-52-90-41-197.compute-1.amazonaws.com"
		];

		async.map(urls, httpGet, function (err, res){
			console.log(res);

			for(var i=0;i<res.length;i++)
			{
				outgoing.push(res[i].outgoingFlights);
				returning.push(res[i].returnFlights);
			}

			var Finalresult={ "outgoingFlights" : outgoing,"returnFlights":returning};
			res1.send(Finalresult);


		});

	});

}

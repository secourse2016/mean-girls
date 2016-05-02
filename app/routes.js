
module.exports = function(app) {

	var jwt     = require('jsonwebtoken');
	var express = require('express');
	var jwt     = require('jsonwebtoken');
	var db      = require('../db.js');
	var moment  = require('moment');
	var path    = require('path');
	var jwtexp  =require('express-jwt')
	var airlinesIP = require('../json/otherAirlines.json');

	// app.use(jwtexp({
	// 	secret: 'CSEN603ROCKSi<8SE!',
	// 	getToken: function(req) {
	// 		if (req.headers && req.headers['x-access-token']) {
	// 			return req.headers['x-access-token'];
	// 		}
	// 		return null;
	// 	}
	// }));

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
	app.get('/api/booking/:bookingRef', function(req,res){
		var bookingRefNo = req.params['bookingRef'];
		db.searchBooking(bookingRefNo,function(err,booking){

			var outFlight=booking[0].outgoingFlight;

			db.searchFlight(outFlight,function(err,Outflight){
				booking[0].outgoingFlight=Outflight[0];
				var resvID=booking[0].reservationID;
				var seatMap=Outflight[0].seatmap;
				console.log(seatMap);
				var outSeat;
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

				booking[0].outgoingFlight.seatNumber = seatNumber;
				booking[0].outgoingFlight.class = cabinClass;
				booking[0].outgoingFlight.cost = cost;

				var retFlight=booking[0].returnFlight;

				if(retFlight != null){
					db.searchFlight(retFlight,function(err,Retflight){
						booking[0].returnFlight=Retflight[0];
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

						booking[0].returnFlight.seatNumber = returnSeatNumber;
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
	app.get('/api/flights/search/:origin/:destination/:departingDate/:class', function(req, res) {
		var originValue = req.params['origin'];
		var destinationValue = req.params['destination'];
		var departingDateValue = req.params['departingDate'];
		var classValue = req.params['class'];

		var info={
			"origin"        : originValue ,
			"destination"   : destinationValue ,
			"departureDate" : departingDateValue ,
			"class"         : classValue
		};

		db.searchFlightsOneWay(info, function (err, flights) {
			if (err) return next(err);
			res.send(flights);
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

	app.post('/api/addbooking',function(req,res){
		var information = req.body;
		console.log(information);
		db.addBooking(information,function(err,booking){
			if (err) return (err);
			console.log(booking);
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








	//new code other airlines

	app.get('/api/other/flights/search/:origin/:destination/:departingDate/:class', function(req1,res1){
		const async = require('async');
		const request = require('request');
		var result;
		// var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJPbmxpbmUgSldUIEJ1aWxkZXIiLCJpYXQiOjE0NjEwOTcwMzgsImV4cCI6MTQ5MjYzMzAzOCwiYXVkIjoid3d3LmV4YW1wbGUuY29tIiwic3ViIjoianJvY2tldEBleGFtcGxlLmNvbSJ9.aBQAGNps9e3XlMEKL_ngj6SwfnPSIqeJacBczEC16k4';
		var originValue = req1.params['origin'];
		var destinationValue = req1.params['destination'];
		var departingDateValue = req1.params['departingDate'];
		var classValue = req1.params['class'];

		function httpGet(url, callback) {
			var secret = 'CSEN603ROCKSi<8SE!';
			var token = jwt.sign({},'CSEN603ROCKSi<8SE!');
			console.log(token);
			var decoded = jwt.verify(token, 'CSEN603ROCKSi<8SE!');
			console.log(decoded)

			const options = {
				port:80,
				method:'GET',
				// header: { 'x-access-token': token },
				url :  url + '/api/flights/search/'+originValue+'/'+destinationValue+'/'+departingDateValue+'/'+classValue+'?wt='+token
			};
			request(options, function(err, res, body) {
				callback(err, body);
			});
		}

		const urls=  [
			"http://ec2-54-152-123-100.compute-1.amazonaws.com",
			"http://52.27.150.19",
			"http://ec2-52-26-166-80.us-west-2.compute.amazonaws.com",
			"http://52.90.46.68",
			"http://52.34.160.140",
			"http://52.36.195.124",
			"http://www.swiss-air.me",
			"http://52.25.15.124",
			"http://52.36.250.55",
			"http://54.187.208.145",
			"http://sebitsplease.com.s3-website-us-east-1.amazonaws.com",
			"http://52.58.46.74",
			"http://54.93.36.94",
			"http://54.191.202.17",
			"http://54.213.157.185",
			"http://52.28.246.230",
			"http://mynksh.com",
			"http://ec2-52-90-41-197.compute-1.amazonaws.com",
			"http://52.32.109.147",
			"http://52.36.169.206",
			"http://ec2-52-91-94-227.compute-1.amazonaws.com",
			"http://ec2-52-26-166-80.us-west-2.compute.amazonaws.com",
			"http://ec2-52-90-41-197.compute-1.amazonaws.com"
		];

		async.map(urls, httpGet, function (err, res){

			console.log( res);
			console.log("res length"+res.length);
			// for(var i=0;i<res.length;i++)
			// {
			//   result.push(res[i].outgoingFlights);
			// }
			console.log("the out going "+res[0].outgoingFlights);

			res1.send(res);

		});
	});

	app.get('/api/other/flights/search/:origin/:destination/:departingDate/:returningDate/:class', function(req1,res1){

		const async = require('async');
		const request = require('request');
		var outgoing=[];
		var returning=[];
		var token = 'eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyJpc3MiOiJBbGFza2EiLCJpYXQiOjE0NjEwNDY5NjcsImV4cCI6MTQ5MjU4Mjk3NCwiYXVkIjoiIiwic3ViIjoiIn0.dxB2Mx4-1W-cqfSeE9LC6QfMGvtLSLXduLrm0j7xzWM';
		var originValue = req1.params['origin'];
		var destinationValue = req1.params['destination'];
		var departingDateValue = req1.params['departingDate'];
		var returningDateValue = req1.params['returningDate'];
		var classValue = req1.params['class'];
		function httpGet(url, callback) {
			var secret = 'CSEN603ROCKSi<8SE!';
			var token = jwt.sign({},'CSEN603ROCKSi<8SE!');
			console.log(token);
			var decoded = jwt.verify(token, 'CSEN603ROCKSi<8SE!');
			console.log(decoded) ;
			const options = {
				port:80,
				method:'GET',
				url :  url + '/api/flights/search/'+originValue+'/'+destinationValue+'/'+departingDateValue+'/'+returningDateValue+'/'+classValue+'?wt='+token
			};
			request(options, function(err, res, body) {
				callback(err, body);
			});
		}

		const urls= [
			"http://ec2-54-152-123-100.compute-1.amazonaws.com",
			"http://52.27.150.19",
			"http://ec2-52-26-166-80.us-west-2.compute.amazonaws.com",
			"http://52.90.46.68",
			"http://52.34.160.140",
			"http://52.36.195.124",
			"http://www.swiss-air.me",
			"http://52.25.15.124",
			"http://52.36.250.55",
			"http://54.187.208.145",
			"http://sebitsplease.com.s3-website-us-east-1.amazonaws.com",
			"http://52.58.46.74",
			"http://54.93.36.94",
			"http://54.191.202.17",
			"http://54.213.157.185",
			"http://52.28.246.230",
			"http://mynksh.com",
			"http://ec2-52-90-41-197.compute-1.amazonaws.com",
			"http://52.32.109.147",
			"http://52.36.169.206",
			"http://ec2-52-91-94-227.compute-1.amazonaws.com",
			"http://ec2-52-26-166-80.us-west-2.compute.amazonaws.com",
			"http://ec2-52-90-41-197.compute-1.amazonaws.com"
		];

		async.map(urls, httpGet, function (err, res){
			console.log(res);
			// outgoing.push(res.outgoingFlights);
			// returning.push(res.returnFlights);
			// var Finalresult={ "outgoingFlights" : outgoing,"returnFlights":returning};
			// res1.send( Finalresult);

			res1.send(res);

		});

	});

}

// var routes = function(app) {
// 	app.get('/', function(req, res){
// 		res.sendFile(path.join(__dirname + '/../public/index.html'));
// 	});

// 	app.get('/404', function(req, res){
// 		res.sendFile(path.join(__dirname + '/../public/404.html'));
// 	});

// }

// module.exports = routes;

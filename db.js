var mongo = require('mongodb').MongoClient;
var dbURL = 'mongodb://localhost:27017/alaska';
var DB=null;


exports.connect = function (cb){
	mongo.connect(dbURL, function (err,db){
			if(err)
				console.log(err);
			else
				console.log("connected the database!");

			DB=db;
			cb(err,db);
		});
}


connect(function (cb){

});

//Find flight from DB when given flight number
exports.searchFlight = function(flightNo,cb){
	DB.collection('flights').find({"flightNumber":flightNo},function(err,cursor){
		cursor.toArray(cb);
		// cb(err,flight);
	});
}


//Find booking from DB when given booking reference number
exports.searchBooking = function(bookingRef,cb){
	DB.collection('bookings').find({"bookingRefNo":bookingRef},function(err,cursor){
		cursor.toArray(cb);
	});
}
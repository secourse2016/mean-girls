var mongo = require('mongodb').MongoClient;
var dbURL = 'mongodb://localhost:27017/alaska';
var DB=null;


var flights=require('./public/dummyData/flights.json');
var bookings=require('./public/dummyData/bookings.json');

connect = function (cb){
	mongo.connect(dbURL, function (err,db){
			if(err)
				console.log(err);
			else
				console.log("connected the database!");

			DB=db;
			cb(err,db);
		});
}
// var DB = connect();
seedFlights = function(cb){
	DB.collection("flights").count(function (err,i){
		if(i>0){
			console.log("error");
			cb(err,false);
		}
		else{
			DB.collection("flights").insert(flights,function(err,seeded){
				// console.log(seeded);
				cb(err,seeded);
			});
			
		}
		
	});
}

seedBooking = function(cb){
	DB.collection("bookings").count(function (err,i){
		if(i>0){
			console.log("error");
			cb(err,false);
		}
		else{
			DB.collection("bookings").insert(bookings,function(err,seeded){
				// console.log(seeded);
				cb(err,seeded);
			});
			
		}
		
	});
}

// DB.collection("bookings").insert(bookings,function(err){
// 	if(err)
// 		console.log(err);
// });
connect(function (cb){
	seedFlights(function(cb){
		seedBooking(function(cb){

			searchFlight("AB123",function(err,flight){
				 console.log(flight);
			});
			searchBooking("hy123",function(err,booking){
				 console.log(booking);
			});

		});
	});
});



searchFlight = function(flightNo,cb){
	console.log("in search flight");
	DB.collection('flights').find({"flightNumber":flightNo},function(err,cursor){
		cursor.toArray(cb);
		// cb(err,flight);
	});
}



searchBooking = function(bookingRef,cb){
	DB.collection('bookings').find({"bookingRefNo":bookingRef},function(err,cursor){
		cursor.toArray(cb);
	});
}
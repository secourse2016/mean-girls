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
// seed = function(cb){
// 	DB.collection("flights").count(function (err,i){
// 		if(i>0){
// 			console.log("error");
// 			cb(err,false);
// 		}
// 		else{
// 			DB.collection("flights").insert(flights,function(err,seeded){
// 				// console.log(seeded);
// 				cb(err,seeded);
// 			});
			
// 		}
		
// 	});
// }

// DB.collection("bookings").insert(bookings,function(err){
// 	if(err)
// 		console.log(err);
// });
connect(function (cb){
	// seed(function(cb){
		searchFlight("AB123",function(err,flight){
			 // console.log(flight);
			 console.log(flight.length);

		});
	// });
});






searchFlight = function(flightNo,cb){
	console.log("in search flight");
	DB.collection('flights').find({"flightNumber":flightNo},function(err,flight){
		console.log(err+"1234");
		cb(err,flight);
	});
}



searchBooking = function(bookingRef,cb){
	DB.collection('bookings').find({"bookingRefNo":bookingRef},function(err,booking){
		if(err){
			cb(err);
		}
		else
		cb(booking);
	});
}
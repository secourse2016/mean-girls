var mongo = require('mongodb').MongoClient;
var moment = require('moment');
var DB = null;
var dbURL = 'mongodb://localhost:27017/alaska';

exports.connect = function(cb) {
    return mongo.connect(dbURL, function(err, db) {
        if (err) return cb(err);
        console.log('connected to db');
        DB = db;
        cb(null, db);
    });
};

exports.db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};


function filteringClass(flights,i){
    if(i.class = "economy") {
        var filteredFlights = flights.filter(function(flight){
            return flight.availableEconomy != 0;
        });
        for(var x=0;x<filteredFlights.length;x++)
        {
           filteredFlights[x].cost=filteredFlights[x].economyCost;
        }
    }
    else {
         var filteredFlights = flights.filter(function(flight){
            return flight.availableBussiness != 0;
        });
         for(var x=0;x<filteredFlights.length;x++)
        {
           filteredFlights[x].cost=filteredFlights[x].bussinessCost;
        }
    }
    
    for(var x=0;x<filteredFlights.length;x++)
    {
           filteredFlights[x].class=i.class;
    }
    
    for(var x=0;x<filteredFlights.length;x++)
    {
           filteredFlights[x].Airline="Alaska";
    }

    for(var x=0;x<filteredFlights.length;x++)
    {
           filteredFlights[x].currency="USD";
    }

    var filteredFlights2 = filteredFlights.filter(function(flight){
            return moment(flight.departureDateTime).format('YYYY-MM-DD')===i.departureDate;
        });
    
    for(var x=0;x<filteredFlights2.length;x++)
    {
           filteredFlights2[x].departureDateTime=moment(filteredFlights2[x].departureDateTime).toDate().getTime();
    }

    var result={ "outgoingFlights" : filteredFlights2};
    return result;

}


function searchFlightsOneWay(i,cb) {
    DB.collection('flights').find({ destination:i.destination , origin:i.origin }).toArray(function(err,flights) {
        if (err) return cb(err);
        cb(null,filteringClass(flights,i)); 
    });
}


exports.searchFlightsOneWay=searchFlightsOneWay;
exports.filteringClass=filteringClass;


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



var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/alaska';
var airports = require('./json/airports.json');
var routes  = require('./json/routes.json');
var moment = require('moment');


exports.connect = function(cb) {
    return mongo.connect(dbURL, function(err, db) {
        if (err) return cb(err);
        console.log('connected to db');
        DB = db;
       	cb(null, db);
    });
}

exports.db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};


function seedFlights(cb){
	outGoingFlightsSeed(function(){
		returnFlightSeed(function(){
			cb();
		})
	});
};

function outGoingFlightsSeed(cb){
	seedAFlight(false,function(err){
		if (err) return err;
		console.log("7alo ya 7alo")
		cb();
	});

}

function returnFlightSeed(cb){
	seedAFlight(true,function(err){
		if (err) return err;
		console.log("Done");
		cb();
	});
}

function flightNumberGenerator (min, max) {
    return Math.floor(Math.random() * (max - min + 1) + min);
}

function seedAFlight (reverseFlag, cb){

	var allFlights = [];
	for(var i=0 ;i<routes.length;i++){
		var flight = routes[i];
		if(reverseFlag) {
			var temp = routes[i].origin;
        	flight = routes[i];
        	flight.origin = flight.destination;
	 		flight.destination = temp;
		}
		for (var k=1 ; k<=45 ; k++){
			var flightToBeInserted = {};
			var seatmap = [];
			flightToBeInserted.flightNumber = flight.flightNumber+(k * flightNumberGenerator(k,(routes.length*45)));
			flightToBeInserted.aircraftModel = flight.aircraftModel;
			flightToBeInserted.aircraftType = flight.aircraftType;
			flightToBeInserted.capacity = flight.capacity;
			flightToBeInserted.duration = flight.duration;
			flightToBeInserted.origin = flight.origin;
			flightToBeInserted.destination = flight.destination;
			flightToBeInserted.economyCost = flight.economyCost;
			flightToBeInserted.businessCost = flight.businessCost;
			flightToBeInserted.availableSeats = flight.availableSeats;
			flightToBeInserted.availableEconomySeats = 20;
			flightToBeInserted.availableBusinessSeats = 40;
			// flightToBeInserted.status = flight.status;
			flightToBeInserted.departureDate = moment('2016-04-13 12:25 AM', 'YYYY-MM-DD hh:mm A').add(k, 'days').format('LLL');
			flightToBeInserted.arrivalDate = moment('2016-04-13 15:25 AM', 'YYYY-MM-DD hh:mm A').add(k, 'days').format('LLL');
			for(var j=1 ; j<11 ; j++){
				var seat = {};
				seat.seatNumber = "A"+j
				seat.type = 'window'
				seat.cabin = 'business'
				seat.cost  = flight["businessCost"]
				seat.reservationID = null
				seatmap.push(seat);
			}
			for(var j=1 ; j<11 ; j++){
				var seat = {};
				seat.seatNumber = "B"+j
				seat.type = 'window'
				seat.cabin = 'business'
				seat.cost  = flight["businessCost"]
				seat.reservationID = null
				seatmap.push(seat);
			}
			for(var j =1 ; j<11 ; j++){
				var seat = {};
				seat.seatNumber = "C"+j
				seat.type = 'aisle'
				seat.cabin = 'economy'
				seat.cost  = flight["economyCost"]
				seat.reservationID = null
				seatmap.push(seat);
			}
			for(var j =1 ; j<11 ; j++){
				var seat = {};
				seat.seatNumber = "D"+j
				seat.type = 'aisle'
				seat.cabin = 'economy'
				seat.cost  = flight["economyCost"]
				seat.reservationID = null
				seatmap.push(seat);
			}
			for(var j =1 ; j<11 ; j++){
				var seat = {};
				seat.seatNumber = "E"+j
				seat.type = 'aisle'
				seat.cabin = 'economy'
				seat.cost  = flight["economyCost"]
				seat.reservationID = null
				seatmap.push(seat);
			}
			for(var j =1 ; j<11 ; j++){
				var seat = {};	
				seat.seatNumber = "F"+j
				seat.type = 'aisle'
				seat.cabin = 'economy'
				seat.cost  = flight["economyCost"]
				seat.reservationID = null
				seatmap.push(seat);
			}
			flightToBeInserted.seatmap = seatmap;
			allFlights.push(flightToBeInserted);
		}
	}
	DB.collection('flights').insert(allFlights, function (err) {
        if (err) return cb(err);
        cb();
    });
}

exports.db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};


function seedAirports (cb) {
    DB.collection('airports').find().toArray(function (err, docs) {
        if (err) return cb(err);
        if (docs.length > 0)
            cb(null, false);
        else {
            DB.collection('airports').insertMany(airports, function (err) {
                if (err) return cb(err);
                  cb(null, true);
            });
        }
    });
}


function searchRoundTripFlight (requiredFlight, cb){
	var chosenFlights = {}
	var filteredFlights = [];
 	

	var query = { 
		origin:requiredFlight.origin, 
		destination:requiredFlight.destination
	};
	query["available"+requiredFlight.class+"Seats"] = { $gt: 0 }; 
	// console.log("QUERY: ", query);
	DB.collection('flights').find(query).toArray(function(err,flights) {
        if (err) return cb(err);
		for(var i =0;i<flights.length;i++){
	    	var temp = flights[i];
	    	var date = moment(temp.departureDate).format('YYYY-MM-DD');
	    	// console.log("tab el date hena bye2ul eh?"+requiredFlight.departingDate);
	    	if (date === requiredFlight.departingDate)
	    		filteredFlights.push(temp);
	    }
        chosenFlights.outgoingFlights = filteredFlights;
    	searchOtherWayAround(chosenFlights, requiredFlight, function(){
        		cb(chosenFlights);
    	});
     });
}

function searchOtherWayAround(chosenFlights, requiredFlight, cb) {
	var filteredFlights = []
	var query = { 
		origin:requiredFlight.destination, 
		destination:requiredFlight.origin
	};
	query["available"+requiredFlight.class+"Seats"] = { $gt: 0 };
	DB.collection('flights').find(query).toArray(function(err,flights) {
    	if (err) return err;

     	for(var i =0;i<flights.length;i++){
	    	var temp = flights[i];
	    	var date = moment(temp.arrivalDate).format('YYYY-MM-DD')
	    	if (date === requiredFlight.returningDate)
	    		filteredFlights.push(temp);
	    }
        chosenFlights.returnFlights = filteredFlights;
    	cb();
	});
}

function firstToLowerCase(string) {
    return string.substr(0, 1).toLowerCase() + string.substr(1);
}

function formatData(beforeFormattingData,reqClass,cb) {
	 // console.log("BEFORE FORMATING: ", beforeFormattingData);
	var formattedData = {};
	var formattedOutgoing = [];
	var formattedReturn = [];
	var classCost = reqClass+"Cost";
	var costOfClass = firstToLowerCase(classCost);

	for(var i =0; i < beforeFormattingData.outgoingFlights.length ; i++){
		var temp = {};
		temp.flightNumber=beforeFormattingData.outgoingFlights[i].flightNumber
		temp.aircraftType=beforeFormattingData.outgoingFlights[i].aircraftType
		temp.aircraftModel=beforeFormattingData.outgoingFlights[i].aircraftModel
		temp.departureDateTime=moment(beforeFormattingData.outgoingFlights[i].departureDate).toDate().getTime();
		temp.arrivalDateTime=moment(beforeFormattingData.outgoingFlights[i].arrivalDate).toDate().getTime();
		temp.origin=beforeFormattingData.outgoingFlights[i].origin
		temp.destination=beforeFormattingData.outgoingFlights[i].destination
		temp.cost=beforeFormattingData.outgoingFlights[i][costOfClass]
		temp.currency="USD";
		temp.class=firstToLowerCase(reqClass);
		temp.Airline="Alaska";
		formattedOutgoing.push(temp)
	}
	for(var i =0; i < beforeFormattingData.returnFlights.length ; i++){
		var temp = {};

		temp.flightNumber=beforeFormattingData.returnFlights[i].flightNumber
		temp.aircraftType=beforeFormattingData.returnFlights[i].aircraftType
		temp.aircraftModel=beforeFormattingData.returnFlights[i].aircraftModel
		temp.departureDateTime=moment(beforeFormattingData.returnFlights[i].departureDate).toDate().getTime();
		temp.arrivalDateTime=moment(beforeFormattingData.returnFlights[i].arrivalDate).toDate().getTime();
		temp.origin=beforeFormattingData.returnFlights[i].origin
		temp.destination=beforeFormattingData.returnFlights[i].destination
		temp.cost=beforeFormattingData.returnFlights[i][costOfClass]
		temp.currency="USD"
		temp.class=firstToLowerCase(reqClass)
		temp.Airline="Alaska"
		formattedReturn.push(temp)
	}
	formattedData.outgoingFlights = formattedOutgoing;
	formattedData.returnFlights = formattedReturn;
	// console.log("FORMATTED DATA: ",formattedData);
	cb(formattedData);
}


exports.seedAirports = seedAirports;
exports.seedFlights = seedFlights;
exports.searchRoundTripFlight = searchRoundTripFlight;
exports.formatData = formatData;

// exports.db = function() {
//     if (DB === null) throw Error('DB Object has not yet been initialized');
//     return DB;
// }

exports.addBooking=function(i,cb){
  var resIDToBe;
  var booking = {};
    // var result;
    // var seatNo;
    DB.collection('bookings').insert({ 

        "passenger": {
            "firstName":i.passenger.firstName,
            "lastname":i.passenger.lastname,
            "birthDate":i.passenger.birthDate,
            "gender":i.passenger.gender,
            "passportCountry":i.passenger.passportCountry,
            "passportNo":i.passenger.passportNo,
            "issueDate":i.passenger.issueDate,
            "expiryDate":i.passenger.expiryDate
        },
        "payment": {
            "cardType":i.payment.cardType,
            "cardNo":i.payment.cardNo,
            "expiryDate":i.payment.expiryDate,
            "amount":i.payment.amount,
            "ccv":i.payment.ccv,
            "cardHolder":i.cardHolder
        },

        "bookingRefNo":i.bookingRefNo,
        "reservationID":i.reservationID,
         "receiptNo":i.receiptNo,
         "outgoingFlight":i.outgoingFlight,
         "returnFlight":i.returnFlight,
         "oneWay":i.oneWay
        
    },function (err){
      if (err) return err;
      DB.collection('bookings').find({"passenger.passportNo":i.passenger.passportNo}).toArray(function (err,doc){
        if (err) return err;
        resIDToBe = " "+doc[0]._id;
        var bookRef = resIDToBe.substr(0, 7);
        DB.collection('bookings').update({ "passenger.passportNo":i.passenger.passportNo }, {$set: { reservationID: resIDToBe , bookingRefNo: bookRef }}, function (err) {
          if (err) return err;
          DB.collection('bookings').find({ "passenger.passportNo":i.passenger.passportNo }).toArray(function (err,returnedBooking){
              booking = returnedBooking;
            // DB.collection('bookings').find({"passenger.passportNo":i.passenger.passportNo}).toArray(function (err,doc){
              // if (err) return err;
              if(i.cabin === "economy"){ 
                  DB.collection('flights').update(
                  {
                  flightNumber:i.flightNumber ,
                  seatmap:{
                    $elemMatch : {
                      cabin : "economy",
                      reservationID : null }
                  }
                  },
                {  
                  $set:{"seatmap.$.reservationID":resIDToBe},
                  $inc:{availableSeats:-1,availableEconomySeats:-1}
                },function(err,results){
                    if(err) return err;
                    cb(null,booking);
                      } 
                );
              }
              else{
                if(i.cabin=="business"){ 
                    DB.collection('flights').update(
                    {
                    flightNumber:i.flightNumber ,
                    seatmap:{
                      $elemMatch : {
                        cabin : "business",
                        reservationID : null }
                    }     
                    },
                  {   
                    $set:{"seatmap.$.reservationID":resIDToBe},
                    $inc:{availableSeats:-1,availableBusinessSeats:-1}
                  },function(err,results){
                      if(err) return err;
                      cb(null,booking);
                      } 
                  );

                }
            }

          // });
          })
        })
    })
  })
}








//Find flight from DB when given flight number
exports.searchFlight = function(flightNo,cb){
	DB.collection('flights').find({"flightNumber":flightNo},function(err,cursor){
		cursor.toArray(cb);
		// cb(err,flight);
	});
};


//Find booking from DB when given booking reference number
exports.searchBooking = function(bookingRef,cb){
	DB.collection('bookings').find({"bookingRefNo":bookingRef},function(err,cursor){
		cursor.toArray(cb);
	});

}

};


exports.getAirports = function(cb){
	Db.collection('airports').find().toArray(function(err,airports){
		cb(err,airports);
	});
};



exports.clearDB=function (done) {
    DB.listCollections().toArray().then(function (collections) {
        collections.forEach(function (c) {
            DB.collection(c.name).removeMany();   
        });
        done();
    }).catch(done);
};



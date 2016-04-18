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
	DB.collection('flights13').insert(allFlights, function (err) {
        if (err) return cb(err);
        cb();
    });
}


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
		destination:requiredFlight.destination,
		// departureDate:requiredFlight.departingDate
		
	};
	query["available"+requiredFlight.class+"Seats"] = { $gt: 0 }; 
	console.log("QUERY: ", query);
	DB.collection('flights13').find(query).toArray(function(err,flights) {
        if (err) return cb(err);
        flights.filter(function(flight){
        	var date = moment(flight.departureDate).format('YYYY-MM-DD');
            if( date ===requiredFlight.departureDate){
            	console.log("TIMEEE"  + moment(flight.departureDate).format('YYYY-MM-DD'));
            	filteredFlights.push(flight);
            }
            chosenFlights.outgoingFlights = filteredFlights;
        	searchOtherWayAround(chosenFlights, requiredFlight, function(){
        		cb(chosenFlights);
        	});
        });

        
    });
}

function searchOtherWayAround(chosenFlights, requiredFlight, cb) {
	var filteredFlights = []
	var query = { 
		origin:requiredFlight.destination, 
		destination:requiredFlight.origin,
		// arrivalDate:requiredFlight.returningDate
	};
	query["available"+requiredFlight.class+"Seats"] = { $gt: 0 };
	DB.collection('flights13').find(query).toArray(function(err,flights) {
    	if (err) return err;
    	flights.filter(function(flight){
    	if( moment(flight.arrivalDate).format('YYYY-MM-DD')===requiredFlight.returningDate){
            	filteredFlights.push(flight);
            }
    	chosenFlights.returnFlights = flights
    	cb();
    	});
	});
}


function formatData(beforeFormattingData,reqClass,cb) {
	console.log("BEFORE FORMATING: ", beforeFormattingData);
	var formattedData = {};
	var formattedOutgoing = [];
	var formattedReturn = [];
	var costOfClass = reqClass+"Cost";

	for(var i =0; i < beforeFormattingData.outgoingFlights.length ; i++){
		var temp = {};
		temp.flightNumber=beforeFormattingData.outgoingFlights[i].flightNumber
		temp.aircraftType=beforeFormattingData.outgoingFlights[i].aircraftType
		temp.aircraftModel=beforeFormattingData.outgoingFlights[i].aircraftModel
		temp.departureDateTime=beforeFormattingData.outgoingFlights[i].departureDate
		temp.arrivalDateTime=beforeFormattingData.outgoingFlights[i].arrivalDate
		temp.origin=beforeFormattingData.outgoingFlights[i].origin
		temp.destination=beforeFormattingData.outgoingFlights[i].destination
		temp.cost=beforeFormattingData.outgoingFlights[i].costOfClass
		temp.currency="USD"
		temp.class=reqClass
		temp.Airline="Alaska"
		formattedOutgoing.push(temp)
	}
	for(var i =0; i < beforeFormattingData.returnFlights.length ; i++){
		var temp = {};
		temp.flightNumber=beforeFormattingData.returnFlights[i].flightNumber
		temp.aircraftType=beforeFormattingData.returnFlights[i].aircraftType
		temp.aircraftModel=beforeFormattingData.returnFlights[i].aircraftModel
		temp.departureDateTime=beforeFormattingData.returnFlights[i].departureDate
		temp.arrivalDateTime=beforeFormattingData.returnFlights[i].arrivalDate
		temp.origin=beforeFormattingData.returnFlights[i].origin
		temp.destination=beforeFormattingData.returnFlights[i].destination
		temp.cost=beforeFormattingData.returnFlights[i].costOfClass
		temp.currency="USD"
		temp.class=reqClass
		temp.Airline="Alaska"
		formattedReturn.push(temp)
	}
	formattedData.outgoingFlights = formattedOutgoing;
	formattedData.returnFlights = formattedReturn;
	console.log("FORMATTED DATA: ",formattedData);
	cb(formattedData);
}


exports.seedAirports = seedAirports;
exports.seedFlights = seedFlights;
exports.searchRoundTripFlight = searchRoundTripFlight;
exports.formatData = formatData;




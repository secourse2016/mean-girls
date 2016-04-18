
var mongo = require('mongodb').MongoClient;
var dbURL = 'mongodb://localhost:27017/alaska';
var DB=null;
var moment = require('moment');


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


// exports.db = function() {
//     if (DB === null) throw Error('DB Object has not yet been initialized');
//     return DB;
// }




exports.addBooking=function(i,cb){
    DB.collection('bookings').insert({ 

        "passenger": {
            "firstName":i.firstName,
            "lastname":i.lastname,
            "birthDate":i.birthDate,
            "gender":i.gender,
            "passportCountry":i.passportCountry,
            "passportNo":i.passportNo,
            "issueDate":i.issueDate,
            "expiryDate":i.expiryDate
        },
        "payment": {
            "cardType":i.cardType,
            "cardNo":i.cardNo,
            "expiryDate":i.expiryDate,
            "amount":i.amount,
            "ccv":i.ccv
        },

        
         "receiptNo":i.receiptNo,
         "reservationID":i.reservationID,
         "bookingRefNo":i.bookingRefNo,
         "outgoingFlight":i.outgoingFlight,
         "returnFlight":i.returnFlight,
         "oneWay":i.oneWay
        
    }) 
     
  if(i.cabin=="economy"){ 

    DB.collection('flights').update(
      {flightNumber:i.flightNumber ,"seatmap.cabin":"economy","seatmap.reservationID": null},
      {$set:{"seatmap.$.reservationID":i.reservationID},$inc:{availableSeats:-1},$inc:{availableEconomySeats:-1}}
    );
  }
  else{
    if(i.cabin=="business"){
       
       DB.collection('flights').update(
      {flightNumber:i.flightNumber ,"seatmap.cabin":"business","seatmap.reservationID": null},
      {$set:{"seatmap.$.reservationID":i.reservationID},$inc:{availableSeats:-1},$inc: {availableBusinessSeats:-1}}
    );

    }
  }
}     




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


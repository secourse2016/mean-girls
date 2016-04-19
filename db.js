
var mongo = require('mongodb').MongoClient;
var dbURL = 'mongodb://localhost:27017/test';
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
}


//Find booking from DB when given booking reference number
exports.searchBooking = function(bookingRef,cb){
	DB.collection('bookings').find({"bookingRefNo":bookingRef},function(err,cursor){
		cursor.toArray(cb);
	});
}


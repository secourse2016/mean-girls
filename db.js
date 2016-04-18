
var mongo = require('mongodb').MongoClient;
var DB = null;
var moment = require('moment');
var dbURL = 'mongodb://localhost:27017/test';

// var flights=require('./public/dummyData/flights.json');
// var bookings=require('./public/dummyData/bookings.json');

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
}




function addBooking(i,cb){
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

exports.addBooking=addBooking;




//var i = {
//         "passenger": {
//             "firstName" : "Hadeel",
//             "lastname":"Ahmed",
//             "birthDate":"17-07-1995",
//             "gender":"FEMALE",
//             "passportCountry":"Egypt",
//             "passportNo": 0382,
//             "issueDate":"03-03-2013",
//            "expiryDate":"05-06-2018"
//         },
//         "payment": {
//             "cardType":"Visa",
//             "cardNo":1235654326457,
//             "expiryDate":"04-05-2018",
//             "amount":220
//         },

//          "flightNumber":"AB132",
//          "receiptNo":230,
//          "reservationID":"XH600",
//          "bookingRefNo":"40",
//          "outgoingFlight":"CAI",
//          "returnFlight":"BER",
//          "oneWay":0,
//          "cabin":"economy",
         
        
//      "seatmap":[
//     {
//         "seatNumber":"12A",
//         "type":"window" ,
//         "cabin":"economy",
//         "cost":"220"
     
//     }

//     ]
// }



// connect(function (cb){
        
//     addBooking(i,function(err,flight){
              
//       console.log(flight);
//     });
// });


 


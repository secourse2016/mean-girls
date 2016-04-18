
var mongo = require('mongodb').MongoClient;
var DB = null;
var dbURL = 'mongodb://localhost:27017/alaska';

var flights=require('./public/dummyData/flights.json');
var bookings=require('./public/dummyData/bookings.json')

connect = function(cb) {
    return mongo.connect(dbURL, function(err, db) {
        if (err) return cb(err);
        console.log('connected to db');
        DB = db;
        cb(null, db);
    });
};

db = function() {
    if (DB === null) throw Error('DB Object has not yet been initialized');
    return DB;
};




// function addBooking(i,cb){
//     DB.collection('bookings').insert({ 

//         "passenger": {
//             "firstName":i.passenger.firstName,
//             "lastname":i.passenger.lastname,
//             "birthDate":i.passenger.birthDate,
//             "gender":i.passenger.gender,
//             "passportCountry":i.passenger.passportCountry,
//             "passportNo":i.passenger.passportNo,
//             "issueDate":i.passenger.issueDate,
//             "expiryDate":i.passenger.expiryDate
//         },
//         "payment": {
//             "cardType":i.payment.cardType,
//             "cardNo":i.payment.cardNo,
//             "expiryDate":i.payment.expiryDate,
//             "amount":i.payment.amount,
//             "ccv":i.ccv
//         },

        
//          "receiptNo":i.receiptNo,
//          "reservationID":i.reservationID,
//          "bookingRefNo":i.bookingRefNo,
//          "outgoingFlight":i.outgoingFlight,
//          "returnFlight":i.returnFlight,
//          "oneWay":i.oneWay
        
//     })  
// }     
    
//     var flightChoosen = DB.collection('flights').find({flightNumber:i.flightNumber}).toArray(function(err,flights){
      
//       var j;

//       for (j=0;j<flightChoosen.seatmap.length;j++){

//             if(seatmap[j].reservationID==null){

//               seatmap[j].reservationID = i.reservationID;
//               flightChoosen.availableSeats=availableSeats-1;
//               break;
//             }
//         }

//         if (err) return cb(err);
         
//         cb(flights);

//     })

// var i = {
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

        
//          "receiptNo":230,
//          "reservationID":"XH60",
//          "bookingRefNo":"40",
//          "outgoingFlight":"CAI",
//          "returnFlight":"BER",
//          "oneWay":0,
//          "flightNumber":"AB123",
        
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

seedFlights = function(cb){
   DB.collection("flights").count(function (err,i){
       if(i>0){
           console.log("error");
           cb(err,false);
       }
       else{
           DB.collection("flights").insert(flights,function(err,seeded){
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
               cb(err,seeded);
           });
           
       }
       
   });
 }
 
 
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


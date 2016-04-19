
module.exports = function(app) {

    var express = require('express');
    var db= require('../db.js');
    var moment = require('moment');
    var path    = require('path');
     

   app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname, '../public', 'index.html'));
      });

    



app.post('/api/addbooking',function(req,res){

  var information = req.payload;
   
    // var information={ 
    //          "passenger":{"firstName":"hadeel",
    //          "lastname":"Ahmed",
    //          "birthDate":"17/7",
    //          "gender":"FEMALE",
    //          "passportCountry":"Egypt",
    //          "passportNo":"12345675765656778",
    //          "issueDate":"177-353",
    //          "expiryDate":"15/3/2018"
    //      },
    //      "payment" : { "cardType":"visa",
    //          "cardNo":"1234567",
    //          "expiryDate":"18/6/2015",
    //          "amount":"1200",
    //          "ccv":"200",
    //          "cardHolder":"dfdfgdf"
    //     },
    //      "flightNumber":"AB132",
    //       "outgoingFlight":"BOM",
    //       "returnFlight":"DEL",
    //       "oneWay":0 , 
    //       "cabin" : "business"
    // };


    db.addBooking(information,function(err,booking){
      if (err) return (err);
      res.send(booking);
     });

  }); 
}







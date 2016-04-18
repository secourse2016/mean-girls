
module.exports = function(app) {

    var express = require('express');
    var db= require('../db.js');
    var moment = require('moment');
    var path    = require('path');
     

   app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname, '../public', 'index.html'));
      });

    



app.post('/api/addbooking',function(req,res){

  var information={ "flightNumber":"AB123",
                    "cabin":"economy",
                    "reservationID":"XH600",
                    "firstName" : "Hadeel",
		            "lastname":"Ahmed",
		            "birthDate":"17-07-1995",
		            "gender":"FEMALE",
		            "passportCountry":"Egypt",
		            "passportNo": 0382,
		            "issueDate":"03-03-2013",
		            "expiryDate":"05-06-2018",
		            "cardType":"Visa",
		            "cardNo":1235654326457,
		            "expiryDate":"04-05-2018",
		            "amount":220

  };


  db.addBooking(information,function(err,flights){
  	if (err) return next(err);
  	res.json(flights);
  });

});

}


module.exports = function(app) {

    // var jwt     = require('jsonwebtoken');
    var express = require('express');
    var db= require('../db.js');
    var moment = require('moment');
    var path    = require('path');
    // var path    = require('path');
    
     app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname, '../public', 'index.html'));
    });

    // app.use(function(req, res, next) {

    //   // check header or url parameters or post parameters for token
    //   var token = req.body.wt || req.query.wt || req.headers['x-access-token'];   

    //   console.log("{{{{ TOKEN }}}} => ", token);

    //   var jwtSecret = process.env.JWTSECRET;

    //   // Get JWT contents:
    //   try 
    //   {
    //     var payload = jwt.verify(token, jwtSecret);
    //     req.payload = payload;
    //     next();
    //   } 
    //   catch (err) 
    //   {
    //     console.error('[ERROR]: JWT Error reason:', err);
    //     res.status(403).sendFile(path.join(__dirname, '../public', '403.html'));
    //   }

    // });

     // api/flights/search/:CAI/:F/:2016-04-16/:Economy
    app.get('/api/flights/search/:origin/:destination/:departingDate/:class', function(req, res) {
          var originValue = req.params['origin'];
          var destinationValue = req.params['destination'];
          var departingDateValue = req.params['departingDate'];
          var classValue = req.params['class'];
        
           var info={ "origin"        : originValue ,
                      "destination"   : destinationValue ,
                      "departureDate" : departingDateValue ,
                      "class"         : classValue 
                  };

         db.searchFlightsOneWay(info, function (err, flights) {
            if (err) return next(err);
            res.send(flights);
            });  

       });

};
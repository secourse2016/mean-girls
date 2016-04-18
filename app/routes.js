module.exports = function(app) {

    var jwt     = require('jsonwebtoken');
    var express = require('express');
    var jwt     = require('jsonwebtoken');
    var db      = require('../db.js');
    var moment  = require('moment');
    var path    = require('path');
    var jwtexp  =require('express-jwt')
    var airlinesIP = require('../json/otherAirlines.json');
     
    app.get('/', function (req, res) {
      res.sendFile(path.join(__dirname, '../public', 'index.html'));
      });


    app.use(jwtexp({
        secret: 'CSEN603ROCKSi<8SE!',
        getToken: function(req) {
        if (req.headers && req.headers['x-access-token']) {
           return req.headers['x-access-token'];
          }
         return null;
       }
    }));

    app.use(function(req, res, next) {

      // check header or url parameters or post parameters for token
      var token = req.body.wt || req.query.wt || req.headers['x-access-token'];   

      console.log("{{{{ TOKEN }}}} => ", token);

      var jwtSecret = process.env.JWTSECRET;

      // Get JWT contents:
      try 
      {
        var payload = jwt.verify(token, jwtSecret);
        req.payload = payload;
        next();
      } 
      catch (err) 
      {
        console.error('[ERROR]: JWT Error reason:', err);
        res.status(403).sendFile(path.join(__dirname, '../public', '403.html'));
      }

    });
      
       
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

  //new code other airlines

    app.get('/api/other/flights/search/:origin/:destination/:departingDate/:class', function(req1,res1){ 
    //*NOTE DIFFERENT NAMING FOR REQ & RES, BEC. THEY'RE USED SEVERAL TIMES*
        const async = require('async');
        const request = require('request');
        var result=[];

        function httpGet(url, callback) {
          const options = {
            url :  url + '/api/flights/search/:origin/:destination/:departingDate/:class'
            };
          request(options, function(err, res, body) {
            callback(err, body);
          }); 
        }

         const urls= require('../json/otherAirlines.json'); 

         async.map(urls, httpGet, function (err, res){
         result.push(res.outgoingFlights);
       // res1.send(//the result);
       });
       var Finalresult={ "outgoingFlights" : result}; 
       res1.send( Finalresult);
  }); 


   app.get('/api/other/flights/search/:origin/:destination/:departingDate/:returningDate/:class', function(req1,res1){ 

        const async = require('async');
        const request = require('request');
        var outgoing=[];
        var returning=[];
        function httpGet(url, callback) {
          const options = {
            url :  url + '/api/flights/search/:origin/:destination/:departingDate/:returningDate/:class'
            };
          request(options, function(err, res, body) {
            callback(err, body);
          }); 
        }

         const urls= require('../json/otherAirlines.json'); 

         async.map(urls, httpGet, function (err, res){
         outgoing.push(res.outgoingFlights);
         returning.push(res.returnFlights);
       // res1.send(//the result);
    });

        var Finalresult={ "outgoingFlights" : outgoing,"returnFlights":returning}; 
       res1.send( Finalresult); 
  });        


};
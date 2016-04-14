var assert = require('chai').assert;
var request = require('supertest');
var app = require('../app.js');
var db = require('../db.js');
var flightsJSON=require('../public/dummyData/flights.json');
var bookingsJSON=require('../public/dummyData/bookings.json');

describe("searchFlight", function() {
    var flightNo = "AB123";
    it("should return flight with the same flight number given", function() {
        db.searchFlight(flightNo,function(flight){
        	assert.equal(flightsJSON[0],flight,'when given first flightNo, returned first element');
        });
    });
  
});

describe("searchBooking", function() {
    var flightNo = "hy123";
    it("should return booking with the same booking ref number given", function() {
        db.searchFlight(flightNo,function(booking){
        	assert.equal(bookingsJSON[0],booking,'when given first booking ref no., returned first element');
        });
    });
  
});
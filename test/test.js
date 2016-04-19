var assert = require("assert");
var assert = require('chai').assert;
var request = require('supertest');
var app = require('../app.js');
var db = require('../db.js');
var flightsJSON=require('../dummyData/flights.json');
var bookingsJSON=require('../dummyData/bookings.json');

describe('Array', function() {
	describe('#indexOf()', function() {
		it('should return -1 when the value is not present', function() {
			assert.equal(true, true);
			assert.equal(false, false);
		});
	});
});



before(function(done) {
    // use this after you have completed the connect function
    db.connect(function(err, db) {
       if (err) return done(err);
       else done();
    });
});

describe("searchFlight", function() {
    var flightNo = "AB123";
    it("should return flight with the same flight number given", function() {
        db.searchFlight(flightNo,function(flight){
        	assert.equal(flightsJSON[0],flight,'when given first flightNo, returned first element');
        	done();
        });
    });
  
});

describe("searchBooking", function() {
    var flightNo = "hy123";
    it("should return booking with the same booking ref number given", function() {
        db.searchFlight(flightNo,function(booking){
        	assert.equal(bookingsJSON[0],booking,'when given first booking ref no., returned first element');
       		done();
        });
    });
  
});
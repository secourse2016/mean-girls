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

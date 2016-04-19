<<<<<<< HEAD
var app=require("./app");
app.listen(3000, function(){
=======
var express = require('express');
var db = require('./db.js');
>>>>>>> 6e813c0f92b36b094b469946119e70510b156c1a

db.connect(function(){
	var app=require("./app/app.js");

	app.listen(3000, function(){
		console.log("Server up & listening on 3000");
	});
});


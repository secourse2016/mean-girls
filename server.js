
var db=require("./db.js");
var express = require('express');

db.connect(function(){
	var app=require("./app/app.js");
	db.seed(function(){
		app.listen(3000, function(){
			console.log("Server up & listening on "+3000);
		});
	});

});

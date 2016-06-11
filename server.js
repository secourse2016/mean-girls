
var db=require("./db.js");
var express = require('express');

db.connect(function(){
	var app=require("./app/app.js");
	db.seed(function(){
		app.listen(80, function(){
			console.log("Server up & listening on "+80);
		});
	});

});

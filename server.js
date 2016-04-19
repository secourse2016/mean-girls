
var db=require("./db.js");
var express = require('express');

db.connect(function(){
	var app=require("./app/app.js");
	db.seed(function(){
		app.listen(process.env.PORT, function(){
			console.log("Server up & listening on "+process.env.PORT);
		});
	});

});

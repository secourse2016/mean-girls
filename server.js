
var db=require("./db.js");
var express = require('express');
var port = process.env.PORT || 8080;
db.connect(function(){
	var app=require("./app/app.js");
	db.seed(function(){
		app.listen(port, function(){
			console.log("Server up & listening on "+80);
		});
	});

});

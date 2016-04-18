var express = require('express');
var db = require('./db.js');
db.connect(function(){
	var app=require("./app/app.js");

	app.listen(8080, function(){
		console.log("Server up & listening on 8080");
	});
});

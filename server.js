var express = require('express');
var db = require('./db.js');

db.connect(function(){
	var app=require('./app/app');

	app.listen(3000, function(){
		console.log("Server up & listening on 3000");
	});
});

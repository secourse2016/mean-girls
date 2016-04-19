var express = require('express');
var db = require('./db.js');

db.connect(function(){
<<<<<<< HEAD
	var app=require('./app/app');
=======
	var app=require("./app/app.js");
>>>>>>> fe85068adfc3c64aca12cfda9131cfe42da3bae9

	app.listen(3000, function(){
		console.log("Server up & listening on 3000");
	});
});

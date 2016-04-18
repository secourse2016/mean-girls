var db=require("./db.js");

db.connect(function(){
 	var app=require("./app/app");
 	app.listen(80, function(){
		console.log("Server up & listening on 80");
	});

});
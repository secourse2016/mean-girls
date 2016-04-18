var db=require("./db.js");

db.connect(function(){
 var app=require("./app/app");
 app.listen(3001, function(){
	console.log("Server up & listening on 80");
});

});

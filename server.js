var db=require("./db.js");

db.connect(function(){
 var app=require("./app/app");
 app.listen(process.env.PORT, function(){
	console.log("Server up & listening on 80");
});

});

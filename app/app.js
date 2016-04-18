var express = require('express');

var app = express();
var path = require('path');


app.use(express.static(path.join(__dirname + '/../public')));

require("./routes.js")(app);

app.use('/*', function(req, res){
	res.redirect('/404');
});
// app.use('/*', function(req, res){
//        res.sendFile(path.join(__dirname+'/../public/404.html'));
// });

module.exports = app;








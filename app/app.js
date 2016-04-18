var express = require('express');
var path = require('path');
var app = express();

app.use(express.static(path.join(__dirname + '/../public')));

require("./routes.js")(app);

// Here's the new code:
app.use('/*', function(req, res){
	res.redirect('/404');
});

module.exports = app;

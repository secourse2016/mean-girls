
var express       = require('express');
var bodyParser    = require('body-parser');
var app           = express();
var path          = require('path');
var moment        = require('moment');
var jwt           = require('jsonwebtoken');
var favicon = require('serve-favicon');


//Export environment vars first thing
require('dotenv').load();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// app.use(express.static('public'));
// Store all HTML files in view folder.

app.use(favicon(__dirname + '/../public/img/favicon.ico'));
app.use(express.static(path.join(__dirname + '/../public')));

require('./routes')(app);

app.use('/*', function(req, res){
  res.sendFile(path.join(__dirname+'/../public/404.html'));
});



module.exports=app;

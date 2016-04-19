

var express       = require('express');
var bodyParser    = require('body-parser');
var app           = express();
var path          = require('path');
var moment        = require('moment');



app.use(express.static(path.join(__dirname + '/../public')));


require('./routes')(app);

app.use('/*', function(req, res){
       res.sendFile(path.join(__dirname+'/../public/404.html'));
    });



module.exports=app;







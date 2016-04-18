var express = require('express');
var app = express();
var path = require('path');


app.use(express.static(path.join(__dirname + '/../public')));

app.use('/*', function(req, res){
       res.sendFile(path.join(__dirname+'/../public/404.html'));
});



require('./routes')(app);

module.exports=app;

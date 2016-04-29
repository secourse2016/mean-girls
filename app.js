var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
// Here's the new code:
app.use('/*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});


// app.use(express.static('public'));
// app.use(express.static('www'));
// require('./routes')(app);


app.post('/addbooking',function(req,res){

});
module.exports=app;

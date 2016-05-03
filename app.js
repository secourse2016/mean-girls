var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
// Here's the new code:
app.use('/*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});

<<<<<<< HEAD

// app.use(express.static('public'));
// app.use(express.static('www'));
// require('./routes')(app);


app.post('/addbooking',function(req,res){

});
=======
>>>>>>> 4fba61910b1b9353774e831e405fa551832be944
module.exports=app;

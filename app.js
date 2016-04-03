var express = require('express');
var app = express();

app.use(express.static(__dirname + '/public'));
// Here's the new code:
app.use('/*', function(req, res){
  res.sendFile(__dirname + '/public/index.html');
});
<<<<<<< HEAD
module.exports=app;
=======
// module.exports=app;
>>>>>>> fcfecf015215a11d4c01d63283236ea061d8d65f

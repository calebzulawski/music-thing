var express = require('express');
var app = express();
var path = require('path');



app.use('/', express.static('public'));

app.get('/', function (req, res) {
  res.sendFile(path.join(__dirname, 'index.html'))
});

var server = app.listen(8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});
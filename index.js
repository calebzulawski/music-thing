var express = require('express');
var app = express();

app.get('/', function (req, res) {
  res.send('Hello world!');
});

app.use('/', express.static('public'));

var server = app.listen(8080, function() {
  var host = server.address().address;
  var port = server.address().port;

  console.log('Listening at http://%s:%s', host, port);
});
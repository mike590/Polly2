var express = require('express');
var app = express();
var config = require('./app/config/config');

require('./app/routes')(app);

app.listen(3000, function () {
  console.log('Polly Listening on 3000')
})

module.exports = app;

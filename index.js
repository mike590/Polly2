var express = require('express');
var app = express();

// log every request
var morgan = require('morgan');
app.use(morgan('dev'));

var config = require('./app/config/config');
var mongoose = require('mongoose');
mongoose.connect(config.db);

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + config.db);
});

var Word = require('./app/models/word');

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

require('./app/routes')(app, Word);

app.listen(3000, function () {
  console.log('Polly Listening on 3000')
})

module.exports = app;

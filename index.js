var express = require('express');
var app = express();
var config = require('./app/config/config');

var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/polly');

var Word = require('./app/word/word')

require('./app/routes')(app);

app.use(express.static('public'))

app.listen(3000, function () {
  console.log('Polly Listening on 3000')
})

module.exports = app;

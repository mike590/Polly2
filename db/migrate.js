var config = require('../app/config/config');
var mongoose = require('mongoose');
mongoose.connect(config.db);

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + config.db);
});

var Word = require('../app/models/word');

var fs = require('fs');
var test = JSON.parse(fs.readFileSync('wordlist.json', 'utf8'));
for(var i = 0, j = test.length; i<j; i++){
	new Word({word: test[i]['word'], pronunciation: test[i]['pron'], truncatedPronunciation: test[i]['exacts']}).save();
}
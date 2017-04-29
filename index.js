var express = require('express');
var app = express();

var config = require('./app/config/config');
var mongoose = require('mongoose');
mongoose.connect(config.db);

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + config.db);
});

var Word = require('./app/models/word')

makeANewOne = function(word, arr) {
	new Word({word: word, pronunciation: arr, truncated_pronunciation: arr}).save();
}

deleteEmAll = function() {
	Word.find({}, function(err, words){
	 	if (err) throw err;
	 	for(var i = 0, j = words.length; i<j; i++){
	 		var temp = words[i].word
			words[i].remove(function(err){
				if (err) throw err;
				console.log("Removed " + temp);
			})
	 	}
	 });
}

listEm = function() {
	 Word.find({}, function(err, words){
	 	if (err) throw err;
	 	console.log(words.length)
	 	for(var i = 0, j = words.length; i<j; i++){
	 		console.log(words[i].word);
	 	}
	 });
}

var path = require('path');
app.use(express.static(path.join(__dirname, 'public')));

require('./app/routes')(app);

app.listen(3000, function () {
  console.log('Polly Listening on 3000')
})

debugger

module.exports = app;

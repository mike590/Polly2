var config = require('../app/config/config');
var mongoose = require('mongoose');
mongoose.connect(config.db);

mongoose.connection.on('connected', function () {
  console.log('Mongoose default connection open to ' + config.db);
});

var Word = require('../app/models/word');

var fs = require('fs');
var path = require('path');

// Word.count(function(err, res){console.log(res)});

// Create all           ----------------------------------
// var wordList = JSON.parse(fs.readFileSync(path.join(__dirname, 'wordlist.json'), 'utf8'));
// for(var i = 0, j = wordList.length; i<j; i++){
// 	Word.create(wordList[i]['word'], wordList[i]['pron'], wordList[i]['exacts']);
// }
//
// setInterval(function(){
// 	Word.find({}, function(err, res){
// 		console.log("Checking");
// 		if(res.length === 5750){
// 			Word.findOne({word:"current"}, function(err,word){
// 			console.log(word.pronunciations);
// 			process.exit();
// 			});
// 		}else{
// 			console.log(res.length + " saved so far");
// 			console.log(5750 - res.length + " to go");
// 		}
// 	});
// }, 1000);


// Delete all           ----------------------------------
// Word.remove({}).exec();

// setInterval(function(){
// 	Word.find({}, function(err, res){
// 		console.log("Checking");
// 		if(res.length === 0){
// 			process.exit();
// 		}else{
// 			console.log(res.length + " left");
// 		}
// 	});
// }, 1000);

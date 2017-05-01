// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;

var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var WordSchema = Schema({
  word: String,
  // both of these should be arrays, and they save that way
  // setting them to array types cause them to be unsetable for some reason
  pronunciations: Object,
  truncated_pronunciations: Object
});

// Class level methods
WordSchema.statics.create = function(word, pronunciations, truncated_pronunciations) {
	temp = new this({word: word, pronunciations: pronunciations, truncated_pronunciations: truncated_pronunciations});
	temp.save(function(err){
		if(err){
			console.log(word + " errored when saving");
			throw err;
		}
	});
};

WordSchema.statics.listAll = function(callback) {
	this.find({}, function(err, words){
		if (err) throw err;
		for(var i = 0, j = words.length; i<j; i++){
			console.log(words[i].word);
		}
		console.log("Total Words: " + words.length);
	});
};

var WordModel = mongoose.model('Word', WordSchema);

module.exports = WordModel;

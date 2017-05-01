var mongoose = require('mongoose'),
	Schema = mongoose.Schema,
	ObjectId = Schema.ObjectId;

var WordSchema = Schema({
  word: String,
  pronunciations: [],
  truncated_pronunciations: []
});

// Class level methods
WordSchema.statics.splitRhyme = function(syllable, callback) {
	this.find({truncated_pronunciations: syllable}, callback);
};

WordSchema.statics.completeRhyme = function(pattern, callback) {
	this.find({truncated_pronunciations: {$in: [new RegExp(pattern)]}}, callback);
};

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

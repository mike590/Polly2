var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WordSchema = Schema({
  word: String,
  pronunciation: String,
  truncatedPronunciation: String
});

var WordModel = mongoose.model('Word', WordSchema);

module.exports = WordModel;

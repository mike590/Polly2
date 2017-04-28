var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var WordSchema = Schema({
  word: {
    type: String
  },
  pronunciation: {
    type: Array
  },
  truncated_pronunciation: {
    type: Array
  }
});

var WordModel = mongoose.model('Word', WordSchema);

module.exports = WordModel;

const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Quotes = new Schema({
  quote: {
    type: String
  },
  title: {
    type: String
  },
  actor: {
    type: String
  },
  year: {
    type: String
  },
  filmPoster: {
    type: String
  },
  charPoster: {
    type: String
  },
  clipLink: {
    type: String
  },
});

module.exports = mongoose.model('quotes', Quotes);

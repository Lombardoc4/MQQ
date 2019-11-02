const mongoose = require('mongoose');
const Schema = mongoose.Schema;


let Verify = new Schema({
  quote: {
    type: String
  },
  title: {
    type: String
  },
  character: {
    type: String
  },
  year: {
    type: String
  },
  clipLink: {
    type: String
  },


});

module.exports = mongoose.model('verify', Verify);

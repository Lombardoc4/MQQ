let QuoteSet = require('../../models/confirmedQuote.model')

//returns ALL users and ALL data
module.exports = (req, res) => {
  QuoteSet.countDocuments().exec(function (err, count) {

  // Get a random entry
  var random = Math.floor(Math.random() * count)

  // Again query all users but only fetch one offset by our random #
  QuoteSet.findOne().skip(random).exec(
    function (err, quote) {
      // Tada! random user
      if (err) {
          console.log(err);
      }
      else {
        res.status(200).json({ quote });
      }
    })
})
};

let QuoteSet = require('../../models/confirmedQuote.model')

//returns ALL users and ALL data
module.exports = (req, res) => {
  QuoteSet.find(function(err, quotes) {
    if (err) {
        console.log(err);
    } else {
        res.json(quotes);
    }
  });
};

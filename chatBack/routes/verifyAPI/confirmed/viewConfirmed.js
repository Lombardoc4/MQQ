let QuoteSet = require('../../../models/confirmedQuote.model')

//returns ALL users and ALL data
module.exports = (req, res) => {
  QuoteSet.findById(req.params.id, function(err, quote) {
    if (err) {
        console.log(err);
    } else {
        res.json(quote);
    }
  });
};

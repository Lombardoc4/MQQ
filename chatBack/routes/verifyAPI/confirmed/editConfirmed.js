let QuoteSet = require('../../../models/quote.model')

//returns ALL users and ALL data
module.exports = (req, res) => {
  QuoteSet.findByIdAndUpdate(
    req.params.id,
    req.body,
    {new: true},
    function(err, quote) {
      if (err) {
          console.log(err);
      } else {
          res.json(quote);
      }
    }
  );
};

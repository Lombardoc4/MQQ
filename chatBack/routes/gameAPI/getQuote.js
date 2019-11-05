let QuoteSet = require('../../models/confirmedQuote.model')

//returns ALL users and ALL data
module.exports = (req, res) => {
  QuoteSet.find(function(err, quotes) {
      console.log('quote');
        if (err) {
            console.log(err);
        } else {
          const length = quotes.length
          const random = Math.floor(Math.random() * length)
          const quote = quotes[random];

          res.status(200).json({ quote });
        }
    });
};

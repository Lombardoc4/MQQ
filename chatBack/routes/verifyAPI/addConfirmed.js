let Confirmed = require('../../models/confirmedQuote.model');

module.exports = (req, res) => {
    let quote = new Verify(req.body);
    quote.save()
      .then(quote => {
        res.status(200).send('quote saved');
      })
      .catch(err => {
        res.status(400).send('quote... failed');
      });
};

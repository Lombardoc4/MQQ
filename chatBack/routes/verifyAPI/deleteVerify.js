let QuoteSet = require('../../models/verifyQuote.model')


module.exports = (req, res) => {
  QuoteSet.findById(req.params.id, function(err, quote) {
    if (err) {
      res.status(404).send("Quote not found");
    }
    else {
      quote.remove().then()
    }
    // res.flash("success", "Tray has been deleted.")
    // return res.redirect("/");
  });
}

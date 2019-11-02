// let Play = require('../../models/confirmedQuote.model');

const quote = require('express').Router();
// define the Express app

const getQuote = require('./getQuote');

quote.get('/', getQuote);

module.exports = quote;

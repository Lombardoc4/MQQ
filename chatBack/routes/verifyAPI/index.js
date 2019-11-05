const contribute = require('express').Router();
// define the Express app


//importing model queries
const contribution = require('./addContribution');
const verify = require('./verify');
const deny = require('./deleteVerify');
const editVerify = require('./editVerify');

const confirmed = require('./confirmed');
const editConfirmed = require('./editConfirmed')
const remove = require('./deleteConfirmed')


// retrieve ALL quotes
contribute.get('/verify', verify);
// contribute.get('/verify/edit/:id', editQuote);
contribute.delete('/verify/remove/:id', deny);
contribute.get('/verify/edit/:id', editVerify);

contribute.delete('/confirmed/remove/:id', remove)
contribute.get('/confirmed', confirmed);
contribute.get('/confirmed/edit/:id', editConfirmed);
// need a post for verify to post it to confirmed db
// need a post for the edit form of the confirmed quotes

// posts quote to verify collection
contribute.post('/contribute', contribution);


module.exports = contribute;

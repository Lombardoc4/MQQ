const contribute = require('express').Router();
// define the Express app


//importing model queries
const addVerify = require('./verify/addVerify');
const verify = require('./verify/verify');
const deny = require('./verify/deleteVerify');
const viewVerify = require('./verify/viewVerify');

const confirmed = require('./confirmed/confirmed');
const addConfirmed = require('./confirmed/addConfirmed')

const remove = require('./confirmed/deleteConfirmed')
const viewConfirmed = require('./confirmed/editConfirmed')


// retrieve ALL quotes
contribute.get('/verify', verify);
contribute.post('/verify', addVerify);
contribute.delete('/verify/remove/:id', deny);
contribute.get('/verify/edit/:id', viewVerify);

contribute.delete('/confirmed/remove/:id', remove)
contribute.get('/confirmed', confirmed);
contribute.post('/confirmed', addConfirmed);
contribute.put('/confirmed/edit/:id', viewConfirmed);
// contribute.post('/confirmed/edit/:id', editVerify);

// need a post for verify to post it to confirmed db
// need a post for the edit form of the confirmed quotes



module.exports = contribute;

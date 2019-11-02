const routes = require('express').Router();

const gameRouter = require('./gameAPI/index.js');
const verifyRouter = require('./verifyAPI/index.js');

routes.get('/', (req, res) => {
  res.status(200).json({ message: 'Connected!' });
});

routes.use('/play', gameRouter);
//make this one more secret
routes.use('/verifymyguy', verifyRouter);


module.exports = routes;

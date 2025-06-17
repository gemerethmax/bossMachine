const express = require('express');
const apiRouter = express.Router();

const minionsRouter = require('./minions');
const meetingsRouter = require('./meetings');
const ideasRouter = require('./ideas');

const logger = (req, res, next) => {
  console.log(`${req.method} request to ${req.url}`);
  next();
}


apiRouter.use(logger);


apiRouter.use('/minions', minionsRouter);
apiRouter.use('/meetings', meetingsRouter);
apiRouter.use('/ideas', ideasRouter);

module.exports = apiRouter;

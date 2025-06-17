const express = require('express');
const minionsRouter = express.Router();

const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require('./db.js');

// Get all minions
minionsRouter.get('/', (req, res, next) => { 
    const minions = getAllFromDatabase('minions');
    if (minions) {
       res.status(200).send(minions);
    } else {
        res.status(404).send({ message: 'No minions found' });
    }
})

// Add a new minion
minionsRouter.post('/', (req, res, next) => {
    const salary = parseInt(req.body.salary);
    const newMinion = req.body;
    newMinion.salary = salary;
    const addedMinion = addToDatabase('minions', newMinion);
    if (addedMinion) {
        res.status(201).send(addedMinion);
    } else {
        res.status(400).send({ message: 'Invalid minion data' });
    }
});

// Get a single minion by ID
minionsRouter.get('/:minionId', (req, res, next) => {
    const id = req.params.minionId
    const minion = getFromDatabaseById('minions', id);
    if (minion) {
        res.status(200).send(minion);
    }
    else {
        res.status(404).send({ message: `Minion ${id} not found` });
    }   
})

module.exports = minionsRouter;

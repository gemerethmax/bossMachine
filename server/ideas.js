const express = require('express');
const ideasRouter = express.Router();
const checkMillionDollarIdea = require('./checkMillionDollarIdea.js');

const {
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
} = require('./db.js');


// Get all ideas
ideasRouter.get('/', (req, res, next) => { 
    const ideas = getAllFromDatabase('ideas');
    if (ideas) {
       res.status(200).send(ideas)
    } else {
        res.status(404).send({ message: 'No ideas found' });
    }
})

// Add a new idea
ideasRouter.post('/', checkMillionDollarIdea, (req, res, next) => {
   
   const ideas = getAllFromDatabase('ideas');
   req.body.id = ideas.length ++
    const addedidea = addToDatabase('ideas', req.body);
    if (addedidea) {
        res.status(201).send(addedidea);
    } else {
        res.status(400).send({ message: 'Invalid idea data' });
    }
});

// Get a single idea by ID
ideasRouter.get('/:ideaId', (req, res, next) => {
    const id = req.params.ideaId
    const idea = getFromDatabaseById('ideas', id);
    if (idea) {
        res.status(200).send(idea);
    }
    else {
        res.status(404).send({ message: `Idea ${id} not found` });
    }   
})

// Update a single idea by ID
ideasRouter.put('/:ideaId', checkMillionDollarIdea,  (req, res, next) => {
    const id = req.params.ideaId
    req.body.id = id
    const updatedIdea = updateInstanceInDatabase('ideas', req.body)
    if (updatedIdea) {
        res.status(200).send(updatedIdea);;
    } else {
        res.status(404).send({ message: `Idea ${id} not found or invalid data` });
    }
})

// Delete a single idea by ID
ideasRouter.delete('/:ideaId', (req, res, next) => {
    const id = req.params.ideaId
    const deletedIdea = deleteFromDatabasebyId('ideas', id);
    if(deletedIdea) {
        // Repsonse 204 doesn't return any content but indicates success
        res.status(204).send();
    } else {
        res.status(404).send({ message: `Idea ${id} not found` });
    }
})

module.exports = ideasRouter;

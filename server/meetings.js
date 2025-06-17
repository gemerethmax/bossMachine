const express = require('express');
const meetingsRouter = express.Router();

const {
  createMeeting,
  getAllFromDatabase,
  getFromDatabaseById,
  addToDatabase,
  updateInstanceInDatabase,
  deleteFromDatabasebyId,
  deleteAllFromDatabase,
} = require('./db.js');


// Get all meetings

meetingsRouter.get('/', (req, res, next) => { 
    const meetings = getAllFromDatabase('meetings');
    if (meetings) {
       res.status(200).send(meetings)
    } else {
        res.status(404).send({ message: 'No meetings found' });
    }
})


// Add a new meeting
meetingsRouter.post('/', (req, res, next) => {
   
    const newMeeting = createMeeting();
    const addedMeeting = addToDatabase('meetings', newMeeting);
    if (addedMeeting) {
        res.status(201).send(addedMeeting);
    } else {
        res.status(400).send({ message: 'Invalid meeting data' });
    }
});



// Delete all meetings
meetingsRouter.delete('/', (req, res, next) => {
   
    const deleted = deleteAllFromDatabase('meetings');
    if(deleted) {
        // Repsonse 204 doesn't return any content but indicates success
        res.status(204).send();
    } else {
        res.status(404).send({ message: `Meetings not deleted` });
    }
})


module.exports = meetingsRouter;

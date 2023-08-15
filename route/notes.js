const notes = require('express').Router();
const dataBase = require('../db/db.json')
const { readFromFile, writeToFile, readAndAppend } = require('../helpers/fsUtils')
const { v4: uuidv4 } = require('uuid');

//This gets the data from the database
notes.get('/', (req, res) => {
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)))
});

//This will post the data from the database
notes.post('/', (req, res) => {
    const responseData = {
    title: req.body.title,
    text: req.body.text, 
    id: uuidv4(),
    }
    readAndAppend(responseData, './db/db.json')
    res.json(dataBase)
});

//This will delete data from the database
notes.delete('/:id', (req, res) => {
    const tipId = req.params.id;
    readFromFile('./db/db.json')
      .then((data) => JSON.parse(data))
      .then((json) => {
        // Make a new array of all notes except the one with the ID provided in the URL
        const result = json.filter((tip) => tip.id !== tipId);
  
        // Save that array to the filesystem
        writeToFile('./db/db.json', result);
  
        // Respond to the DELETE request
        res.json(`Item ${tipId} has been deleted 🗑️`);
      });

})
   
//we need a delete option which uses id's

module.exports = notes
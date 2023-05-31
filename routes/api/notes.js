
const path = require('path');
const fs = require('fs');
const util=require('util');
const uuid= require('uuid');
const express=require('express');
const router = express.Router();



//fs promises
const readFromFile = util.promisify(fs.readFile);
const writeToFile = (destination, content) =>
  fs.writeFile(destination, JSON.stringify(content, null, 4), (err) =>
    err ? console.error(err) : console.info(`\nData written to ${destination}`)
  );
const readAndAppend = (content, file) => {
  fs.readFile(file, 'utf8', (err, data) => {
    if (err) {
      console.error(err);
    } else {
      const parsedData = JSON.parse(data);
      parsedData.push(content);
      writeToFile(file, parsedData);
    }
  });
};

//read db.json and return saved notes as json
router.get('/', (req,res) => {
    console.log(`${req.method} request recieved`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    
});

//POST /api/notes
router.post('/', (req, res) => {
  console.log(`${req.method} request recieved`);
  const note = req.body;
  if (note.title && note.text) {
      let id = uuid.v4();
      const newNote = {
          title:note.title,
          text:note.text,
          id,
      };
      readAndAppend(newNote, './db/db.json');
      let response = {
          status: 'New note successful',
          body: newNote,
      };
      res.json(response);
      console.log(res.json(response))
  } else {
      res.json('Error in posting new note.')
  }
  
});

module.exports = router;
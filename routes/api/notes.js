
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

//DELETE route
router.delete('/:id', (req, res) => {
    //read all of the notes from the db.json file, remove the note with given id, then rewrite to the correct file
    console.log(`${req.params.id} is deleting`);
    //readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    readFromFile('./db/db.json', 'utf-8').then((data) => {
        const notes = JSON.parse(data);
        let found = notes.some(note => {
            /*console.log('note id ' + note.id + typeof note.id);
            console.log('req param ' + (req.params.id) + typeof req.params.id);
            console.log(note.id === req.params.id)*/
            return note.id === req.params.id});
        //console.log(found);
        
        if (found){
            const delNotes = notes.filter(note => note.id !== req.params.id);
            writeToFile('./db/db.json', delNotes);
            return res.json(delNotes);
        }else{
            res.status(400).json({msg : `Note with id of ${req.params.id} not found`})
        };
        
    });
    
});

module.exports = router;
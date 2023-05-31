//import and init express
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const util=require('util');
const uuid= require('uuid');
//set static folder
app.use(express.static('public'));
//body parser middleware and to handle form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

//get route for home page

app.get('/', (req,res)=> {
    //res.send('<h1>Hello</h1>')
    res.sendFile(path.join(__dirname, 'public/index.html'));
});
//get route for notes page

app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, 'public/notes.html'))
});
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
app.get('/api/notes', (req,res) => {
    console.log(`${req.method} request recieved`);
    readFromFile('./db/db.json').then((data) => res.json(JSON.parse(data)));
    
});

//POST /api/notes
//should recieve new note to save on request body, add it to db.json, then return the new note to the client
//give unique id with uuid
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
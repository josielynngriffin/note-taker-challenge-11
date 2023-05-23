//import and init express
const express = require('express');
const app = express();
const path = require('path');

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

//GET /api/notes
//read db.json and return saved notes as json

//POST /api/notes
//should recieve new note to save on request body, add it to db.json, then return the new note to the client
//give unique id with uuid
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
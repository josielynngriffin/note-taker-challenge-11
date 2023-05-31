//import and init express
const express = require('express');
const app = express();
const path = require('path');
const fs = require('fs');
const util=require('util');
const uuid= require('uuid');

const navRoutes = require('./routes/index.js');
const apiRoutes = require('./routes/api/notes.js')
//set static folder
app.use(express.static('public'));
//body parser middleware and to handle form data
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use('/api/notes', apiRoutes);
app.use('/', navRoutes);

//should recieve new note to save on request body, add it to db.json, then return the new note to the client
//give unique id with uuid
const PORT = process.env.PORT || 3000;

app.listen(PORT, () => console.log(`Server started on http://localhost:${PORT}`));
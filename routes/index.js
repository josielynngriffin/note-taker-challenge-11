const path = require('path');
//const fs = require('fs');
//const util=require('util');
const express=require('express');
const router = express.Router();


router.get('/', (req,res)=> {
    //res.send('<h1>Hello</h1>')
    res.sendFile(path.join(__dirname, '../public/index.html'));
});
//get route for notes page

router.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, '../public/notes.html'))
});

module.exports = router;
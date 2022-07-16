const express = require('express');
const path = require('path');
const fs = require('fs');
const notes = require('./db/db.json');

const app = express();
const PORT = 3001;

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// post and save to db.json
app.post('/api/notes', (req, res) => {
    req.body.id = notes.length.toString();
    const note = req.body;
    notes.push(note);

    fs.writeFileSync(path.join(__dirname, './db/db.json'), JSON.stringify(notes), error => {
        if (error) {
            console.log(error);
        }
    });

    res.json(note);
});

//  returns notes from db.json
app.get('/api/notes', (req, res) => {
    const results = notes;
    
    res.json(results);
});

// returns notes.html
app.get('/notes', (req, res) => {
    res.sendFile(path.join(__dirname, './public/notes.html'));
});

// defaults to index.html
app.get('/*', (req, res) => {
    res.sendFile(path.join(__dirname, './public/index.html'));
});

app.listen(PORT, () => {
    console.log(`API server now on port ${PORT}!`);
});
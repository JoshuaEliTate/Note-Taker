const express = require('express');
const app = express();
const db = require("./db/notes.json")
const PORT = process.env.PORT || 8080;
const uuid = require('./math/uuid');
const fs = require('fs');
const util = require('util');
const readFromFile = util.promisify(fs.readFile);


app.use('/', express.static('public'));

app.use('/notes', express.static('./public/notes.html'));


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
  
  app.get('/api/notes', (req, res) => {
    console.info(`${req.method} request received for todos`);
    readFromFile('./db/notes.json').then((data) => res.json(JSON.parse(data)));
  });
  
  app.post('/api/notes', (req, res) => {
    console.info(`${req.method} request received to add a todo`);
  
    const { noteTitle, noteText, id } = req.body;
  
    if (req.body) {
      const newTip = {
        noteTitle,
        noteText,
        id: uuid(),
      };
  
      readAndAppend(newTip, './db/notes.json');
      res.json(`Todo added successfully 🚀`);
    } else {
      res.error('Error in adding todo');
    }
  });





  
app.listen(PORT, () => {
    console.log(`API listening on port ${PORT}`);
});


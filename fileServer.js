//this is the basic solution i coded with my basic knowledge

const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 3000;

function fileNames(req, res) {
  const folderPath = './files';
  fs.readdir(folderPath, (err, files) => {
    if (err) throw err;
    res.send(files);
  });
}

function fileContents(req, res) {
  const fileName = req.params.filename;
  const filePath = path.join(__dirname, 'files', fileName);
  fs.readFile(filePath, 'utf8', (err, data) => {
    if (err) {
      res.status(404).send('File not found');
    } else {
      res.send(data);
    }
  });
}

app.get('/files', fileNames);
app.get('/file/:filename', fileContents);

app.use((req, res) => {
  res.status(404).send('404 Not Found');
});

app.listen(port, post);
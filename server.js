const express = require('express');
const path = require('path');
// const api = require('./routes/notes');


const port = process.env.PORT || 3001

const app = express();

//Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
// app.use('/api', api);

app.use(express.static('public'));

// GET Route for homepage
app.get('/', (req, res) =>
  res.sendFile(path.join(__dirname, '/public/index.html'))
);

// GET Rout for Notes page
app.get('/notes', (req, res) => (
    res.sendFile(path.join(__dirname, '/public/notes.html'))
));

// Server
app.listen(port, () =>
  console.log(`App listening at http://localhost:${port}`)
);
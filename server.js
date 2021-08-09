const express = require('express');
const app = express();
const cors = require('cors');
const router = require('./controller');

app.use(express.json());
app.use(cors());

app.get('/', (req, res) => {
    res.send('Hello World');
})

app.use('/', router);

module.exports = app;
const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const bkashController = require('./bkashController.js');
const cors = require("cors");

const app = express();
const port = 3000;

app.use(cors());

app.use(express.static(path.join(__dirname, 'public')));

app.use(bodyParser.json());

app.use((req, res, next) => {
    console.log(`Request received: ${req.method} ${req.url}`);
    next();
});

app.use('/api', bkashController);

app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});

const express = require('express');
const app = express();
const morgan = require('morgan');
const bodyParser = require('body-parser');
const errorHandler = require('./error-handler');

app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(express.static('./public'));

const images = require('./routes/images');

app.use('/api/images', images);

app.use((req, res) => {
    res.sendFile('index.html', {
        root: './public/',
    });
});

app.use(errorHandler());

module.exports = app;
/* eslint-disable-next-line */
const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

const DIST_FOLDER = '/dist';

/* eslint-disable-next-line */
app.use(express.static(`${__dirname}${DIST_FOLDER}/`));

app.use('*', (req, res) => {
    res.redirect('/');
});

app.get('/', (req, res) => {
    res.sendFile('./dist/index.html');
});

app.listen(PORT, () => {
    /* eslint no-console: 0 */
    console.log(`App listening on port ${PORT}!`);
});

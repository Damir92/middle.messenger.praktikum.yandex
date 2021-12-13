/* eslint-disable-next-line */
const express = require('express');

const app = express();
const PORT = 3000;

const DIST_FOLDER = '/dist';

/* eslint-disable-next-line */
app.use(express.static(`${__dirname}${DIST_FOLDER}/`));

app.listen(PORT, () => {
    /* eslint no-console: 0 */
    console.log(`App listening on port ${PORT}!`);
});

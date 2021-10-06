const express = require('express');

const app = express();
const PORT = 3000;

const DIST_FOLDER = '/dist';

app.use(express.static(`${__dirname}${DIST_FOLDER}/`));

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
}); 

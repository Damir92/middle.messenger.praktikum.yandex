const express = require('express');

const app = express();
const PORT = 3000;

const API_PREFIX = '/dist';

app.use(express.static(`${__dirname}${API_PREFIX}/`));

app.listen(PORT, function () {
  console.log(`App listening on port ${PORT}!`);
}); 

const express = require('express');
const app = express();
const config = require('./config/config.json');
const environemnt = process.env.NODE_ENV || 'development';
const environemntConfig = config[environemnt];
__rooutpath = __dirname;
const db = require('./models');
require('./routes/views')(app, __rooutpath);
console.log(db);
app.listen(environemntConfig.PORT, function () {
  console.log('\nApp Live On : ', environemntConfig.PORT, '\nVVVVVVVV\n\n');
});
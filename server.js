const express = require('express');
const app = express();
const config = require('./config/config.json');
const environemnt = process.env.NODE_ENV || 'development';
const environemntConfig = config[environemnt];
__rooutpath = __dirname;

require('./routes/views')(app, __rooutpath);

app.listen(environemntConfig.PORT, function () {
  console.log('\nApp Live On : ', environemntConfig.PORT, '\nVVVVVVVV\n\n');
});
const express = require('express');
const axios = require('axios');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const config = require('./config/config.json');
const app = express();
const environemnt = process.env.NODE_ENV || 'development';
const environemntConfig = config[environemnt];
const databaseURL = 'jobs';
const collection = 'posts';
require('./routes/views');



app.listen(environemntConfig.PORT, function () {
  console.log('App Live On : ', environemntConfig.PORT);
});
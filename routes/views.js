const express = require('express');
const renderer = require('express-handlebars');
const axios = require('axios');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const databaseURL = 'jobs';
const collection = 'posts';

function Router(app) {
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static('public'));
  app.engine('handlebars', renderer());
  app.set('view engine', 'handlebars');

  app.get('/', async function(req, res) {
    console.log('homepage')
    try {
      let scrappedData = await axios.get("https://stackoverflow.com/jobs");
      let $ = await cheerio.load(scrappedData.data);
      let results = {};
      results.titles = [];
      let titles = $('h2').text().split('\n');
      titles.forEach(function(item) {
        results.titles.push(item.trim());
      });
      console.log(results.titles);
      res.render('index', {data: results});
    } catch (error) {
      console.log("error! ", error);
    }
  });
}

module.exports = Router;

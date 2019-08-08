const express = require('express');
const renderer = require('express-handlebars');
const axios = require('axios');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const databaseURL = 'jobs';
const collection = 'posts';
const logger = require('morgan');

function Router(app) {
  // app.use(logger("dev"));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());
  app.use(express.static('public'));
  app.engine('handlebars', renderer());
  app.set('view engine', 'handlebars');

  app.get('/', async function(req, res) {
    console.log('homepage')
    try {
      let scrappedData = await axios.get("https://stackoverflow.com/jobs");
      scrappedData.data.replace(/[\n][\s]/g, '');
      let $ = cheerio.load(scrappedData.data);
      let results = [];
      let jobs = $('.-job .-title');

      for(let i = 0; i < jobs.length; i++) {
        let job = $(jobs[i]);
        results.push({
          text: job
            .children('h2')
            .text()
            .trim(),
          link: job
            .find('a')
            .attr('href'),
          age: job
            .children('span')
            .text()
            .trim(),
          company: job
            .parent('.-job-summary')
            .children('.-company')
            .text()
            .trim(),
          pay: job
            .parent('.-job-summary')
            .children('.-salary')
            .text()
            .trim(),
          tags: job
            .parent('.-job-summary')
            .children('.-tags')
            .children('a')
            .text(),
        });
      }
      console.log(results);
      res.render('index', {data: results});
    } catch (error) {
      console.log("error! ", error);
    }
  });
}

module.exports = Router;

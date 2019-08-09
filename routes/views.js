const express = require('express');
const renderer = require('express-handlebars');
const axios = require('axios');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const path = require('path');
const databaseURL = 'jobs';
const collection = 'posts';
const logger = require('morgan');

function Router(app, __rootpath) {

  // app.use(logger("dev"));
  app.use( '/assets', express.static(
    path.resolve(
      __rootpath + '/public'
    )
  ));
  app.use(express.urlencoded({ extended: true }));
  app.use(express.json());

  app.engine('handlebars', renderer());
  app.set('view engine', 'handlebars');

  app.get('/', async function(req, res) {
    console.log('homepage')
    try {
      let scrappedData = await axios.get("https://stackoverflow.com/jobs?c=usd&ms=Junior&mxs=MidLevel&dr=FrontendDeveloper&j=permanent&j=contract");
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
      res.render('index', {data: results});
    } catch (error) {
      console.log("error! ", error);
    }
  });
}

module.exports = Router;

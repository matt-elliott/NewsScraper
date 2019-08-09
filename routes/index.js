const express = require('express');
const renderer = require('express-handlebars');
const axios = require('axios');
const mongoose = require('mongoose');
const cheerio = require('cheerio');
const path = require('path');
const databaseURL = 'jobs';
const collection = 'posts';
const logger = require('morgan');

function Router(app, __rootpath, db) {
  mongoose.set('useFindAndModify', false);
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
    try {
      let posts = await db.Posts.find().populate('Comments');
      res.render('index', {data: posts});
    } catch (error) {
      console.log("error! ", error);
    }
  });

  app.get('/scrape', async function(req, res) {
    try {
      let scrappedData = await axios.get("https://stackoverflow.com/jobs?c=usd&ms=Junior&mxs=MidLevel&dr=FrontendDeveloper&j=permanent&j=contract");
        
      scrappedData.data.replace(/[\n][\s]/g, '');
      let $ = cheerio.load(scrappedData.data);
      let results = [];
      let jobs = $('.-job .-title');

      for(let i = 0; i < jobs.length; i++) {
        let job = $(jobs[i]);

        results.push({
          title: job
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
            .replace(/\n/g, '')
            .trim(),
          pay: job
            .parent('.-job-summary')
            .children('.-salary')
            .text()
            .replace(/[\n][\S]/g, '')
            .trim(),
          tags: job
            .parent('.-job-summary')
            .children('.-tags')
            .children('a')
            .text(),
        });
      }

      let postResponse = await db.Posts.create(results);
      res.json(postResponse);
    } catch(error) {
      console.log(error);
    }
  });

  app.post('/post', async function(req, res) {
    try {
      let response = await db.Post.create(req.body);  
    } catch (error) {
      console.log('post create error : ', error);
    }
  });

  app.post('/comment/:id', async function({params, body}, res) {
    try {
      let comment = await db.Comments.create(body);
      let post = await db.Posts.findOneAndUpdate(
        { _id: params.id },
        { comments: comment.comment },
        { new: true}
      );
      res.sendStatus(200);
    } catch (error) {
      console.log('comment create error :', error);
    }
  });
}

module.exports = Router;

const express = require('express');
const router = express.Router();

router.get('/', async function (req, res) {
  try {
    let scrappedData = await axios.get('https://stackoverflow.com/jobs');
    console.log(scrappedData);
    const $ = cheerio.load(scrappedData.data);
    console.log($)
    res.send($);
  } catch (error) {
    console.log('error! ', error);
  }

  res.end();
});

module.exports = router;
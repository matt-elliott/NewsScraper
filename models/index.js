const mongoose = require('mongoose');
const MONGOB_URI = process.env.MONGOB_URI || "mongodb://heroku_ntkw4z8j:8md6qta1quivi1bq211i1gdbg0@ds261277.mlab.com:61277/heroku_ntkw4z8j";
const Comments = require('./comments')
module.exports = async function() {
  const db = await mongoose.connect(MONGOB_URI);
  console.log(db);
  return db;
}
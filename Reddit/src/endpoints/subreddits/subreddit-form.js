const db = require('../database');
const templates = require('../templates');

function subForm(req, res){

  var html = templates['create-subreddit.html']();
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = subForm;
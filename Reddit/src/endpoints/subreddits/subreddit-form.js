const db = require('../database');
const templates = require('../templates');

function subForm(req, res){


  var html = templates['create-subreddit.html']({user: req.session.user});
  res.setHeader('Content-Type', "text/html");
  res.setHeader('Content-Length', html.length);
  res.end(html);
}

module.exports = subForm;
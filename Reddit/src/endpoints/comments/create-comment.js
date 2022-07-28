const sanitizeHTML = require('sanitize-html');
const db = require('../database');
const serveError = require('../serve-error');
//const loadBody = require('../middleware/load-body');

function createComment(req, res){
  var comment = req.body.comment;

  var id = parseInt(req.params.id, 10);

  comment = sanitizeHTML(comment);

  var info = db.prepare(`INSERT INTO comments (text, posts_id) VALUES (?, ?)`).run(comment, id);
  
  if(info.changes !== 1) return serveError(req, res, 500, "Unable to write to database");
  

  res.statusCode = 302;
  res.setHeader("Location", `/post-comments/${id}`);
  res.end();
}

module.exports = createComment;
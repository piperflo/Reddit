const db = require('../database');
const templates = require('../templates');

function postComments(req, res){
    const id = parseInt(req.params.id, 10);

    //var change = db.prepare("UPDATE votes SET amount = ? WHERE post_id = ?").run(amount, id);
    var posts = db.prepare(`SELECT * FROM posts 
                WHERE id= ?`).get(id);
    var comments = db.prepare(`SELECT * FROM comments 
                WHERE posts_id = ?`).all(id);
    var votes = db.prepare(`SELECT * FROM votes
                WHERE post_id= ?`).get(id);
    var obj = {
        votes: votes,
        post: posts,
        comment: comments
    }
    console.log(obj);
    var html = templates['post-layout.html'](obj);
    res.setHeader('Content-Type', "text/html");
    res.setHeader('Content-Length', html.length);
    res.end(html);
  }
  
  
  module.exports = postComments;
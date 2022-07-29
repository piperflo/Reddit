const sanitizeHTML = require('sanitize-html');
const db = require('../database');
const serveError = require('../serve-error');
//const loadBody = require('../middleware/load-body');

function upvote(req, res){


    var id = parseInt(req.params.id, 10);

    //var posts = db.prepare(`SELECT * FROM posts WHERE id = ?`).get(id);
    var votes = db.prepare(`SELECT * FROM votes WHERE post_id = ?`).get(id);
    if (typeof votes.votes === 'undefined') {
        votes.votes = 0;
    }
    var amount = votes.votes + 1;
    var change = db.prepare("UPDATE votes SET votes = ? WHERE post_id = ?").run(amount, id);

    //var info = db.prepare(`INSERT INTO votes (votes, post_id) VALUES (?, ?)`).run(amount, id);
    
    //if(info.changes !== 1) return serveError(req, res, 500, "Unable to write to database");
    

    res.statusCode = 302;
    res.setHeader("Location", `/post-comments/${id}`);
    res.end();
}

module.exports = upvote;
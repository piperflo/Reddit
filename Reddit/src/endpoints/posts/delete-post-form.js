const sanitizeHTML = require('sanitize-html');
const db = require('../database');
const serveError = require('../serve-error');
const templates = require('../../templates');


function deletePostForm(req, res) {
    var posts = db.prepare(`SELECT * FROM posts`).all();
    const id = parseInt(req.params.id, 10);
    var subs = db.prepare(`SELECT * FROM subreddits 
                            WHERE id= ?`).get(id);
    var obj = {
        posts:posts,
        subs: subs,
        errorMessage: "",
    }
    var html = templates['delete-post.html'](obj);
    res.setHeader('Content-Type', "text/html");
    res.setHeader('Content-Length', html.length);
    res.end(html);
}

module.exports = deletePostForm;
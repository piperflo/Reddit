const sanitizeHTML = require('sanitize-html');
const db = require('../database');
const serveError = require('../serve-error');
const templates = require('../../templates');


function adminForm(req, res) {
    var subreddit = db.prepare(`SELECT * FROM subreddits`).all();
    
    var obj = {
        subreddit,subreddit
    }
    var html = templates['delete-subreddit.html'](obj);
    res.setHeader('Content-Type', "text/html");
    res.setHeader('Content-Length', html.length);
    res.end(html);
}

module.exports = adminForm;
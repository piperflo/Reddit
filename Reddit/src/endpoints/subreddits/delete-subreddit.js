const sanitizeHTML = require('sanitize-html');
const db = require('../database');
const serveError = require('../serve-error');
//const loadBody = require('../middleware/load-body');

function deleteSubreddit(req, res){
    var subreddit = req.body.subreddit;

    subreddit = sanitizeHTML(subreddit);
    //var id = parseInt(req.params.id, 10);
    var reddit = db.prepare("SELECT * FROM subreddits WHERE name = ?").get(subreddit);
    subreddit = sanitizeHTML(subreddit);

    var id = reddit.id;
    console.log(subreddit);
    console.log(id);
    //var info = db.prepare(`INSERT INTO subbreddits (text, posts_id) VALUES (?, ?)`).run(Subbreddit, id);
    var subs = db.prepare(`DELETE FROM subreddits 
                            WHERE name = ?`).run(subreddit);

    var posts = db.prepare(`DELETE FROM posts 
                            WHERE sub_id = ?`).run(id);
    if(subs.changes !== 1) return serveError(req, res, 500, "Unable to Delete database");
    if(posts.changes !== 1) return serveError(req, res, 500, "Unable to Delete database");

    res.statusCode = 302;
    res.setHeader("Location", `/`);
    res.end();
}

module.exports = deleteSubreddit;
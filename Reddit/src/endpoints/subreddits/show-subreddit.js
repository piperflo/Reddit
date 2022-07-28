const db = require('../../database');
const templates = require('../../templates');

function subPosts(req, res){
    const id = parseInt(req.params.id, 10);

    var subreddits = db.prepare(`SELECT * FROM subreddits`).all();
    var listHtml = templates['subreddit-list.html']({subreddits: subreddits});
    var obj = {
        subreddits: subreddits,
        list: listHtml,
        user: req.session.user
    }
    console.log(obj);
    var html = templates['subreddit-layout.html'](obj);
    res.setHeader('Content-Type', "text/html");
    res.setHeader('Content-Length', html.length);
    res.end(html);
  }
  
  module.exports = subPosts;

  
const db = require('../../database');
const templates = require('../../templates');

function subToPost(req, res){
    const id = parseInt(req.params.id, 10);
    var subs = db.prepare(`SELECT * FROM subreddits 
                            WHERE id= ?`).get(id);

    var posts = db.prepare(`SELECT * FROM posts 
                            WHERE sub_id = ?`).all(id);
    var listHtml = templates['post-list.html']({posts: posts});
    var obj = {
        sub: subs,
        posts: posts,
        list: listHtml,
        user: req.session.user
    }
    console.log(obj);
    var html = templates['subreddit-post.html'](obj);
    res.setHeader('Content-Type', "text/html");
    res.setHeader('Content-Length', html.length);
    res.end(html);
}

module.exports = subToPost;
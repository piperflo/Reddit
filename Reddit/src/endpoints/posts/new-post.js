const templates = require('../templates');
const db = require('../database');
/** @function newPost 
 * Serves the form for creating a new post 
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object
 */
function newPost(req, res) {
    const id = parseInt(req.params.id, 10);
    var subs = db.prepare(`SELECT * FROM subreddits 
                            WHERE id= ?`).get(id);
    var form = templates["new-post.html"]({sub: subs});
    var html = templates["layout.html"]({
      sub: subs,
      post: form, 
      list: "", 
      title: "New Post",
      user: req.session.user
    });
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", "text/html");
    res.end(html);
}

module.exports = newPost;
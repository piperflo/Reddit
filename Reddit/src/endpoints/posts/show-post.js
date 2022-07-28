const templates = require('../../templates');
const db = require('../../database');

/** @function showPost 
 * Serves the specified post as a resonse.  The post id should be in req.params.id
 * @param {http.IncomingMessage} req - the request object 
 * @param {http.ServerResponse} res - the response object 
 */
function showPost(req, res) {
  // Determine the post ID
  const id = parseInt(req.params.id, 10);

  var subreddit = db.prepare(`SELECT * FROM subreddits WHERE id = ?`).get(id);
  var posts = db.prepare(`SELECT * FROM posts WHERE sub_id = ?`).all(id);
  ////////////////////////////////////////////////////////////
  //var post = db.prepare("SELECT * FROM posts WHERE id = ?").get(id);
  post.date = new Date(post.date);

  //var posts = db.prepare("SELECT * FROM posts ORDER BY date DESC").all();
 
  var title = subreddit.name;

  //var postHtml = templates['post.html'](post);
  var listHtml = templates['post-list.html']({posts: posts});
  var html = templates['layout.html']({
    //post: postHtml, 
    list: listHtml, 
    title: title,
    user: req.session.user
  });
  // Serve the HTML
  res.setHeader("Content-Type", "text/html");
  res.setHeader("Content-Length", html.length);
  res.end(html);
}

module.exports = showPost;
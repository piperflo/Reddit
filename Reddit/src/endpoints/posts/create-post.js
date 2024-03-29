const sanitizeHTML = require('sanitize-html');
const db = require('../database');
const serveError = require('../serve-error');

/** @function createPost()
 * Creates a new post using the supplied form data
 */
function createPost(req, res) {
    var title = req.body.title;
    var content = req.body.content;
    const id = parseInt(req.params.id, 10);
    var date = new Date().valueOf();
    var creator = req.session.user.username;
    // Validate the input
    if(!title || !content) return serveError(req, res, 422, "Empty title or content encountered");
    
    // Sanitize the content
    content = sanitizeHTML(content);
    
    // Publish the post to the database
    var info = db.prepare("INSERT INTO POSTS (title, content, date, sub_id, creator) VALUES (?, ?, ?, ?, ?)").run(title, content, date, id, creator);
    
    // Determine if the write succeeded
    if(info.changes !== 1) return serveError(req, res, 500, "Unable to write to database");
    
    // Redirect to the read page for the post
    //res.writeHead(302, {"Location": `/r/${id}/posts`}).end();
    res.statusCode = 302;
    res.setHeader("Location", `/r/${id}`);
    res.end();
}

module.exports = createPost;
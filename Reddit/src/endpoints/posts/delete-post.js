const sanitizeHTML = require('sanitize-html');
const db = require('../database');
const serveError = require('../serve-error');
const templates = require('../../templates');

function deletePost(req, res){
    var post = req.body.post;

    post = sanitizeHTML(post);

    var id = parseInt(req.params.id, 10);

    var reddit = db.prepare("SELECT * FROM posts WHERE title = ?").get(post);
    post = sanitizeHTML(post);
    //var id = reddit.id;
    if(!reddit) return failure(req, res, `The post "${post}" cannot be found.`, id);
    
    
    console.log(post);
    console.log(id);
    //var info = db.prepare(`INSERT INTO subbreddits (text, posts_id) VALUES (?, ?)`).run(Subbreddit, id);
    var posts = db.prepare(`DELETE FROM posts 
                            WHERE title = ?`).run(post);

    var comms = db.prepare("SELECT * FROM comments WHERE posts_id = ?").get(id);
    
    if(comms != "" || comms != NULL){
        var comments = db.prepare(`DELETE FROM comments WHERE posts_id = ?`).run(id);
        //Deletes if there are no chages
        //if(comments.changes == 0) return serveError(req, res, 500, "Unable to Delete database");
    }
    
    if(posts.changes !== 1) return serveError(req, res, 500, "Unable to Delete database");

    res.statusCode = 302;
    res.setHeader("Location", `/r/${id}`);
    res.end();
}

function failure(req, res, errorMessage, id) {
    if(!errorMessage) errorMessage = "There was an error processing your request.  Please try again."
    /*var form = templates["create-admin.html"]({
      errorMessage: errorMessage
    });*/
    var posts = db.prepare(`SELECT * FROM posts`).all();
    var subs = db.prepare(`SELECT * FROM subreddits 
                            WHERE id= ?`).get(id);
        
    var html = templates["delete-post.html"]({
        errorMessage: errorMessage,
        posts:posts,
        subs: subs
    });
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html);
  }
module.exports = deletePost;
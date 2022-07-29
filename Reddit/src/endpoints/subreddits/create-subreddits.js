const sanitizeHTML = require('sanitize-html');
const db = require('../database');
const serveError = require('../serve-error');

/** @function createPost()
 * Creates a new post using the supplied form data
 */
function createSub(req, res) {
    var sub = req.body.sub;

    var date = new Date().valueOf();

    var creator = req.session.user.username;

    //console.log("This is the user:" + creator);
    sub = sanitizeHTML(sub);
  
    var info = db.prepare(`INSERT INTO subreddits (name, date, creator) VALUES (?, ?, ?)`).run(sub, date, creator);
    
    if(info.changes !== 1) return serveError(req, res, 500, "Unable to write to database");
    
  
    res.statusCode = 302;
    res.setHeader("Location", `/`);
    res.end();
}

module.exports = createSub;
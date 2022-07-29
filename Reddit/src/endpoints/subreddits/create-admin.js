
const bcrypt = require('bcrypt');
const db = require('../../database');
const serveError = require('../../serve-error');
const sanitizeHTML = require('sanitize-html');
const templates = require('../../templates');

function createAdmin(req, res) {
    var username = req.body.username;

    // Check for existing user
    var existingUser = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
    //if(!existingUser) return serveError(req, res, 422, "No user selected or invalid user");
    if(!existingUser) return failure(req, res, `The username "${username}" cannot be found.`);
    console.log(username);

    var change = db.prepare("UPDATE users SET auth_id = 1 WHERE username = ?").run(username);
    if(change.changes !== 1) return serveError(req, res, 500, "Unable to write to database");
    //res.json(change);
    res.statusCode = 302;
    res.setHeader("Location", `/`);
    res.end();
}
function failure(req, res, errorMessage) {
    if(!errorMessage) errorMessage = "There was an error processing your request.  Please try again."
    /*var form = templates["create-admin.html"]({
      errorMessage: errorMessage
    });*/
    var users = db.prepare(`SELECT * FROM users`).all();
        
    var html = templates["create-admin.html"]({
        errorMessage: errorMessage,
        users:users,
    });
    res.setHeader("Content-Type", "text/html");
    res.setHeader("Content-Length", html.length);
    res.end(html);
  }
module.exports = createAdmin;


const bcrypt = require('bcrypt');
const db = require('../../database');
const serveError = require('../../serve-error');
const sanitizeHTML = require('sanitize-html');


function createAdmin(req, res) {
    var username = req.body.username;

    // Check for existing user
    var existingUser = db.prepare("SELECT * FROM users WHERE username = ?").get(username);
    if(!existingUser) return serveError(req, res, 422, "No user selected or invalid user");

    console.log(username);
    //username = sanitizeHTML(username);
    //Want to change the value of auth_id
    //db.prepare("INSERT INTO users (username) VALUES (?, ?);").run(username);
    var change = db.prepare("UPDATE users SET auth_id = 1 WHERE username = ?").run(username);
    if(change.changes !== 1) return serveError(req, res, 500, "Unable to write to database");
    //res.json(change);
    res.statusCode = 302;
    res.setHeader("Location", `/`);
    res.end();

}

module.exports = createAdmin;

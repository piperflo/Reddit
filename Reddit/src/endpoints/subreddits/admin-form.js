const sanitizeHTML = require('sanitize-html');
const db = require('../database');
const serveError = require('../serve-error');
const templates = require('../../templates');
/** @function createPost()
 * Creates a new post using the supplied form data
 */
function adminForm(req, res) {
    var users = db.prepare(`SELECT * FROM users`).all();
    var obj = {
        users:users,
        errorMessage: ""
    }
    var html = templates['create-admin.html'](obj);
    res.setHeader('Content-Type', "text/html");
    res.setHeader('Content-Length', html.length);
    res.end(html);
}

module.exports = adminForm;
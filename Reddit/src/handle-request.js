const serveHomepage = require('./serve-homepage');
/** @function handleRequest 
 * Handles incoming requests by deciding what 
 * kind of response to send
 * @param {http.IncomingMessage} req - the request object
 * @param {http.ServerResponse} res - the response object
 */
function handleRequest(req, res) {
  serveHomepage(req, res);
}

module.exports = handleRequest;
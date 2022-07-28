const db = require('../../database');

//console.log("Test 1");
function subreddits(req, res) {
  var subs = db.prepare("SELECT * FROM subreddits ORDER BY id DESC").all(); //Array of objects
  res.json(subs);
}


module.exports = subreddits;
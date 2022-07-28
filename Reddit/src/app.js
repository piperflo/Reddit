const express = require('express');
const serveHomepage = require('./endpoints/serve-homepage');
const loadBody = require('./middleware/load-body');
const loadSession = require('./middleware/load-session');
const authorsOnly = require('./middleware/authors-only');
const serveError = require('./serve-error');
//const basicAuth = require('./middleware/basic-auth');
const newUser = require('./endpoints/new-user');
const newSession = require('./endpoints/new-session');
const createUser = require('./endpoints/create-user');
const createSession = require('./endpoints/create-session');
const destroySession = require('./endpoints/destroy-session');
const serveFeed = require('./endpoints/serve-feed.js');


const newPost = require('./endpoints/posts/new-post');
const createPost = require('./endpoints/posts/create-post');
const showPost = require('./endpoints/posts/show-post');
const postComment = require('./endpoints/posts/post-comments.js');

const createComment = require('./endpoints/comments/create-comment');

const subPost = require('./endpoints/subreddits/show-subreddit');
const postHomepage = require('./endpoints/subreddits/subreddit-to-post');

const createSub = require('./endpoints/subreddits/create-subreddits');
const subForm = require('./endpoints/subreddits/create-admin');

const adminsOnly = require('./middleware/admins-only');

const adminForm = require('./endpoints/subreddits/admin-form');
const createAdmin = require('./endpoints/subreddits/create-admin');
var app = express();

app.use(loadSession);

app.get('/', subPost);

app.get('/r/:id/posts/new', authorsOnly, newPost);
app.post('/r/posts/:id/post', authorsOnly, loadBody, createPost);

app.get('/posts/:id', showPost);

//Signup/Out
app.get('/signup', newUser);
app.post("/signup", loadBody, createUser);
app.get('/signin', newSession);
app.post("/signin", loadBody, createSession);
app.get("/signout", destroySession);

app.get('/post-comments/:id', postComment);
//This is how the sub should be made
///subreddit-post/<%= sub.id %>
app.get('/r/:id', postHomepage);

app.post("/post-comments/:id/comments", loadBody, createComment);

app.get("/create-subreddit", adminsOnly, subForm);
//Added t
app.post("/create-subreddit/create", authorsOnly, loadBody, createSub);

app.get("/create-admin", adminForm);

app.post("/create-admin/create", adminsOnly, loadBody, createAdmin);


app.get('/rss', serveFeed);
app.use(express.static('public'));

module.exports = app;
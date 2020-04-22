require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const db = require('./models');
const cors = require('cors');
const errorHandler = require('./handlers/error');
const { loginRequired, ensureCorrectUser} = require('./middleware/auth');
const PORT = process.env.PORT || 8081;
// ROUTES
const AUTH_ROUTES = require('./routes/auth');
const EXPERIENCES_ROUTES = require('./routes/experiences');
const PROFILE_ROUTES = require('./routes/profile');
const PROJECTS_ROUTES = require('./routes/projects');
const SKILLS_ROUTES = require('./routes/skills');
const app = express();

app.use(cors());
app.use(bodyParser.json());
// ROUTES
app.use('/api/auth', AUTH_ROUTES);
app.use('/api/users/:id/profile', loginRequired, ensureCorrectUser, PROFILE_ROUTES);
app.use('/api/users/:id/experiences', loginRequired, ensureCorrectUser, EXPERIENCES_ROUTES);
app.use('/api/users/:id/projects', loginRequired, ensureCorrectUser, PROJECTS_ROUTES);
app.use('/api/users/:id/skills', loginRequired, ensureCorrectUser, SKILLS_ROUTES);

// ERROR HANDLER
app.use(function(req, res, next) {
    let msg = `Sorry, we can't find the page you're looking for!`;
    let e = new Error(msg);
    e.status = 404;
    next(e);
});
app.use(errorHandler);

app.listen(PORT, function() {
    let msg = `Express server listening on port ${this.address().port} in ${app.settings.env} mode.`;
    console.log(msg);
});

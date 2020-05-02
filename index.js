require('dotenv').config();

const bodyParser = require('body-parser');
const express = require('express');
const cors = require('cors');
const errorHandler = require('./handlers/error');
const { loginRequired, ensureCorrectUser, checkAdminRole } = require('./middleware/auth');
const PORT = process.env.PORT || 8081;
// ROUTES
const AUTH_ROUTES = require('./routes/auth');
const EXPERIENCES_ROUTES = require('./routes/experiences');
const PROJECTS_ROUTES = require('./routes/projects');
const SKILLS_ROUTES = require('./routes/skills');
const JOBS_ROUTES = require('./routes/jobs');
const UNAUTH_ROUTES = require('./routes/unauth');
const PROFILE_ROUTES = require('./routes/profiles');
const app = express();

app.use(cors());
app.use(bodyParser.json());

// ROUTES
app.use('/api/auth', AUTH_ROUTES);
app.use('/api/jobs', UNAUTH_ROUTES);
app.use('/api/users/:_id/experiences', loginRequired, ensureCorrectUser, EXPERIENCES_ROUTES);
app.use('/api/users/:_id/projects', loginRequired, ensureCorrectUser, PROJECTS_ROUTES);
app.use('/api/users/:_id/skills', loginRequired, ensureCorrectUser, SKILLS_ROUTES);
app.use('/api/users/:_id/profiles', loginRequired, ensureCorrectUser, PROFILE_ROUTES);
app.use('/api/users/:_id/jobs', loginRequired, ensureCorrectUser, JOBS_ROUTES);

// ERROR HANDLER
app.use(function(req, res, next) {
    let msg = `Sorry, we can't find the endpoint you're looking for!`;
    let e = new Error(msg);
    e.status = 404;
    next(e);
});
app.use(errorHandler);

app.listen(PORT, function() {
    let msg = `Express server listening on port ${this.address().port} in ${app.settings.env} mode.`;
    console.log(msg);
});

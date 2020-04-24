const mongoose = require('mongoose');
const DB_CONNECTION = 'mongodb://localhost/lumaki-board';

mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect(DB_CONNECTION, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports.User = require('./user');
module.exports.Experience = require('./experience');
module.exports.Project = require('./project');
module.exports.Skill = require('./skill');

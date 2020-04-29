const mongoose = require('mongoose');
const DB_CONNECTION = 'mongodb://localhost/lumaki-board';

mongoose.set('debug', true);
mongoose.Promise = Promise;
mongoose.connect(DB_CONNECTION, {
    keepAlive: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
});

module.exports.user = require('./user');
module.exports.student_profile = require('./studentProfile');
module.exports.experience = require('./experience');
module.exports.project = require('./project');
module.exports.skill = require('./skill');
module.exports.job = require('./job');

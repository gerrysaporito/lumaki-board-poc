const mongoose = require('mongoose');
const User = require('./user');

const ProjectSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {timestamp: true});

ProjectSchema.pre('remove', async function(next) {
    try {
        let user = await User.findById(this.user);
        user.profile.projects.remove(this.id);
        await user.save();
        return next();
    } catch(e) {
        next(e.message);
    }
});

const Project = mongoose.model('Project', ProjectSchema);
module.exports = Project;

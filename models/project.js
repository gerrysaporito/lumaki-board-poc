const mongoose = require('mongoose');
const db = require('./index');

const ProjectSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
}, {timestamp: true});

ProjectSchema.pre('remove', async function(next) {
    try {
        let user = await db.user.findById(this.user);
        let profile = await db[user.profile_type].findById(user.profile);
        profile.projects.remove(this.id);
        await profile.save();
        return next();
    } catch(e) {
        next(e.message);
    }
});

const Project = mongoose.model('project', ProjectSchema);
module.exports = Project;

const mongoose = require('mongoose');
const db = require('./index');

/*
* Model: Describes a project a student's worked on.
*
* This model conatins information about a single project a user's worked on.
*/
const ProjectSchema = new mongoose.Schema({
    description: {
        type: String,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
}, {timestamps: true});

/*
* Function: Removes the reference to this project from the user who created it.
*/
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

const mongoose = require('mongoose');
const db = require('./index');

/*
* Model: Describes a skill a user's has.
*
* This model conatins information about a single skill a student has.
*/
const SkillSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true,
        maxLength: 150,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
}, {timestamps: true});

/*
* Function: Removes the reference to this skill from the user who created it.
*/
SkillSchema.pre('remove', async function(next) {
    try {
        let user = await db.user.findById(this.user);
        let profile = await db[user.profile_type].findById(user.profile);
        profile.skills.remove(this.id);
        await profile.save();
        return next();
    } catch(e) {
        next(e.message);
    }
});

const Skill = mongoose.model('skill', SkillSchema);

module.exports = Skill;

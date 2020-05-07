const mongoose = require('mongoose');
const db = require('./index');

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

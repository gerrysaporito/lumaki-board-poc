const mongoose = require('mongoose');
const User = require('./user');

const SkillSchema = new mongoose.Schema({
    skill: {
        type: String,
        required: true,
        maxLength: 150,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {timestamp: true});

SkillSchema.pre('remove', async function(next) {
    try {
        let user = await User.findById(this.user);
        user.skills.remove(this.id);
        await user.save();
        return next();
    } catch(e) {
        next(e.message);
    }
});

const Skill = mongoose.model('Skill', SkillSchema);
module.exports = Skill;

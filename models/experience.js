const mongoose = require('mongoose');
const User = require('./user');

const ExperienceSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        maxLength: 150,
    },
    role: {
        type: String,
        required: true,
        maxLength: 150,
    },
    description: {
        type: String,
        required: true,
        maxLength: 1500,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {timestamp: true});

ExperienceSchema.pre('remove', async function(next) {
    try {
        let user = await User.findById(this.user);
        user.experiences.remove(this.id);
        await user.save();
        return next();
    } catch(e) {
        next(e.message);
    }
});

const Experience = mongoose.model('Experience', ExperienceSchema);
module.exports = Experience;

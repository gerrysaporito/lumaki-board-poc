const mongoose = require('mongoose');
const db = require('./index');

/*
* Model: Describes a student's work experience.
*
* This model conatins information about a single student's work experience.
*/
const ExperienceSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
        maxLength: 150,
    },
    position: {
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
        ref: 'user',
    },
}, {timestamps: true});

/*
* Function: Removes the reference to this experieince from the user who created it.
*/
ExperienceSchema.pre('remove', async function(next) {
    try {
        let user = await db.user.findById(this.user);
        let profile = await db[user.profile_type].findById(user.profile);
        profile.experiences.remove(this.id);
        await profile.save();
        return next();
    } catch(e) {
        next(e);
    }
});

const Experience = mongoose.model('experience', ExperienceSchema);

module.exports = Experience;

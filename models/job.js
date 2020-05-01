const mongoose = require('mongoose');
const db = require('./index');

const JobSchema = new mongoose.Schema({
    company: {
        type: String,
        required: true,
    },
    link: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true,
    },
    position: {
        type: String,
        required: true,
    },
    industry: {
        type: String,
        required: true,
    },
    location: {
        type: String,
        required: true,
    },
    start_date: {
        type: Date,
        required: true,
    },
    end_date: {
        type: Date,
        required: true,
    },
    duration: {
        type: String,
        required: true,
    },
    company_description: {
        type: String,
        required: true,
    },
    position_description: {
        type: String,
        required: true,
    },
    responsibilities: [
        {
            text: {
                type: String,
            }
        }
    ],
    requirements: [
        {
            text: {
                type: String,
            }
        }
    ],
    compensation: [
        {
            text: {
                type: String,
            }
        }
    ],
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'user',
        },
    ],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
}, {timestamp: true});

JobSchema.pre('remove', async function(next) {
    try {
        let user = await db.user.findById(this.user);
        let profile = await db[user.profile_type].findById(user.profile);
        let usersApplications = await db.user.find({
            '_id': {
                $in: job.applications,
            }
        });
        for await (let singleUser of usersApplications) {
            let singleUserProfile = await db[singleUser.profile_type].findById(singleUser.profile);
            singleUserProfile.applications.remove(this.id);
            singleUserProfile.save();
        }
        profile.applications.remove(this.id);
        await profile.save();
        return next();
    } catch(e) {
        next(e.message);
    }
});

const Job = mongoose.model('job', JobSchema);
module.exports = Job;

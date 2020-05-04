const mongoose = require('mongoose');
const db = require('./index');

const PostSchema = new mongoose.Schema({
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
    post_industry: {
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

PostSchema.pre('remove', async function(next) {
    try {
        let user = await db.user.findById(this.user_id);
        let profile = await db[user.profile_type].findById(user.profile);
        let applications = await db.user.find({
            '_id': {
                $in: this.applications,
            }
        });
        for await (let candidate of applications) {
            let candidateProfile = await db[candidate.profile_type].findById(candidate.profile);
            candidateProfile.applications.remove(this.id);
            candidateProfile.save();
        }
        profile.postings.remove(this.id);
        await profile.save();
        return next();
    } catch(e) {
        next({
            status: 400,
            message: {
                user: await db.user.findById(this.user_id),
                message: e.message,
            }
        });
    }
});

const Post = mongoose.model('post', PostSchema);
module.exports = Post;

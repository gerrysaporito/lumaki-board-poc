const mongoose = require('mongoose');
const User = require('./user');

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
            type: String,
        }
    ],
    requirements: [
        {
            type: String,
        }
    ],
    compensation: [
        {
            type: String,
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },
}, {timestamp: true});

JobSchema.pre('remove', async function(next) {
    try {
        let user = await User.findById(this.user);
        user.jobs.remove(this.id);
        await user.save();
        return next();
    } catch(e) {
        next(e.message);
    }
});

const Job = mongoose.model('Job', JobSchema);
module.exports = Job;

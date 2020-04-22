const mongoose = require('mongoose');

const ProfileSchema = new mongoose.Schema({
    school: {
        type: String,
        required: true,
    },
    program: {
        type: String,
        required: true,
    },
    graduation_year: {
        type: Date,
        required: true,
    },
    gender:{
        type: String,
    },
    experiences: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Experience',
        }
    ],
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Project',
        }
    ],
    skills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Skill',
        }
    ],
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
    },  
}, {timestamp: true});

const Profile = mongoose.model('Profile', ProfileSchema);

module.exports = Profile;

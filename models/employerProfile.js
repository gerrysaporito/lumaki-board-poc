const mongoose = require('mongoose');
const db = require('./index');

const EmployerProfileSchema = new mongoose.Schema({
    company: {
        type: String,
        default: '',
    },
    link: {
        type: String,
        default: '',
    },
    image: {
        type: String,
        default: '',
    },
    company_description: {
        type: String,
        default: '',
    },
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

const employer_profile = mongoose.model('employer_profile', EmployerProfileSchema);
module.exports = employer_profile;

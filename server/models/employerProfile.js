const mongoose = require('mongoose');
const db = require('./index');

/*
* Model: Describes a profile for an Employer.
*
* This model contains a list of attributes which holds details about the employer's company.
*/
const EmployerProfileSchema = new mongoose.Schema({
    company: {
        type: String,
        default: '',
    },
    link: {
        type: String,
        default: '',
    },
    company_size: {
        type: String,
        default: '',
    },
    remote_internship_experience: {
        type: String,
        default: '',
    },
    company_industry: {
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
    country: {
        type: String,
        default: '',
    },
    state: {
        type: String,
        default: '',
    },
    city: {
        type: String,
        default: '',
    },
    postings: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'posts',
        },
    ],
    user_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'user',
    },
}, {timestamps: true});

const employer_profile = mongoose.model('employer_profile', EmployerProfileSchema);

module.exports = employer_profile;

const mongoose = require('mongoose');
const db = require('./index');

/*
* Model: Describes a profile for an Student.
*
* This model contains a list of attributes which holds details about the
* student's professional life.
*/
const StudentProfileSchema = new mongoose.Schema({
    school: {
        type: String,
        default: '',
    },
    program: {
        type: String,
        default: '',
    },
    graduation_date: {
        type: Date,
        default: new Date('2000 01 01'),
    },
    gender:{
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
    experiences: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'experience',
        }
    ],
    projects: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'project',
        }
    ],
    skills: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'skill',
        }
    ],
    applications: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'post',
            unique: true,
        }
    ],
}, {timestamps: true});

const student_profile = mongoose.model('student_profile', StudentProfileSchema);

module.exports = student_profile;

const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    first_name: {
        type: String,
        required: true,
    },
    last_name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        unique: true,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    role: {
        type: String,
        enum: ['user', 'admin', 'superadmin'],
        default: 'user',
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        refPath: 'profile_type',
    },
    profile_type: {
        type: String,
        required: true,
        enum: ['student_profile', 'employer_profile']
    },
});

UserSchema.pre('save', async function(next) {
    try {
        if(!this.isModified('password')) {
            return next();
        }

        let hashedPassword = await bcrypt.hash(this.password, 12);
        this.password = hashedPassword;
        return next();
    } catch(e) {
        return next(e);
    }
});

UserSchema.methods.comparePassword = async function(candidatePassword, next) {
    try {
        let isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch(e) {
        return next(e);
    }
};

const user = mongoose.model('user', UserSchema);

module.exports = user;

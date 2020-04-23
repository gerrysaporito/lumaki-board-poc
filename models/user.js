const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const UserSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true,
    },
    imageUrl:{
        type: String,
    },
    profile: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Profile',
    },
    jobs: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Profile',
        }
    ]
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

const User = mongoose.model('User', UserSchema);

module.exports = User;

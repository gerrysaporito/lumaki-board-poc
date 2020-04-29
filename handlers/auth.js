const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next) {
    try {
        let user = await db.user.findOne({
            email: req.body.email
        });
        let { _id, role, profile_type, first_name } = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch) {
            let token = jwt.sign({
                _id,
                first_name,
                role,
                profile_type,
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                _id,
                first_name,
                role,
                profile_type,
                token,
            });
        } else {
            return next({
                status: 400,
                message: 'Invalid email/password.',
            });
        }
    } catch(e) {
        return next({
            status: 400,
            message: 'Invalid email/password.',
        });
    }
}

exports.signup = async function(req, res, next) {
    try {
        let profile = await db[req.body.profile_type].create({});
        let user = await db.user.create({
            ...req.body,
            profile: profile._id,
            profile_type: req.body.profile_type,
            role: 'superadmin',
        });
        let { _id, role, profile_type, first_name } = user;
        let token = jwt.sign({
            _id,
            first_name,
            role,
            profile_type,
        }, process.env.SECRET_KEY);
        return res.status(200).json({
            _id,
            first_name,
            role,
            profile_type,
            token,
        });
    } catch(e) {
        if(e.code === 11000) {
            e.message = 'Sorry, that username and/or email is taken.';
        }
        return next({
            status: 400,
            message: e.message,
        });
    }
};

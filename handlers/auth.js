const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next) {
    try {   
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id, username, profileImageUrl } = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch) {
            let token = jwt.sign({
                id,
                username,
                profileImageUrl,
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                id,
                username,
                profileImageUrl,
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
        let user = await db.User.create(req.body);
        let { id, username, email, profileImageUrl } = user;
        let token = jwt.sign({
            id, 
            username, 
        }, process.env.SECRET_KEY);
        return res.status(200).json({ 
            id, 
            username, 
            email,
            profileImageUrl,
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

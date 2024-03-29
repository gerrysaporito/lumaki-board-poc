const db = require('../models');
const jwt = require('jsonwebtoken');

/*
* Function: Logs a user in if they have an account.
*
* If successful, will return a token with their info.
* If failed, will return an error to the client prompting them to check their credentials.
*/
exports.signin = async function(req, res, next) {
    try {
        let user = await db.user.findOne({
            email: req.body.email
        });
        let { _id, role, profile_type, first_name, last_name } = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch) {
            let profile = await db[user.profile_type].findById(user.profile);
            let token = jwt.sign({
                _id,
                first_name,
                last_name,
                role,
                profile_type,
                profile: profile._doc,
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                _id,
                first_name,
                last_name,
                role,
                profile_type,
                profile: profile._doc,
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
            message: e.message,
        });
    }
}

/*
* Function: Registers a user.
*
* If successful, will create a user profile depending on what type of person is registering.
* If failed, will return an error to the client prompting them to choose another email.
*/
exports.signup = async function(req, res, next) {
    try {
        let checkUserExists = await db.user.findOne({email: req.body.email});
        if(checkUserExists === null) {
            let profile = null;
            switch(req.body.profile_type) {
                case 'student_profile': {
                    profile = await db[req.body.profile_type].create({});
                    break;
                }
                case 'employer_profile': {
                    profile = await db[req.body.profile_type].create({
                        company: req.body.company,
                    });
                    break;
                }
            }
            let user = await db.user.create({
                ...req.body,
                profile: profile._id,
                profile_type: req.body.profile_type,
            });
            let { _id, role, profile_type, first_name, last_name } = user;
            let token = jwt.sign({
                _id,
                first_name,
                last_name,
                role,
                profile_type,
                profile: profile._doc,
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                _id,
                first_name,
                last_name,
                role,
                profile_type,
                token,
            });
        } else {
            return next({
                status: 400,
                message: 'Sorry, that email is taken.',
            });
        }
    } catch(e) {
        if(e.code === 11000) {
            e.message = 'Sorry, that email is taken.';
        }
        return next({
            status: 400,
            message: e.message,
        });
    }
};

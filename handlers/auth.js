const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next) {
    try {
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { id } = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch) {
            let token = jwt.sign({
                id,
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                id,
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
        let user = await db.User.create({
            ...req.body,
            school: '',
            program: '',
            graduation_year: '2000-01-02',
            gender:'',
        });
        let { id } = user;
        let token = jwt.sign({
            id,
        }, process.env.SECRET_KEY);
        return res.status(200).json({
            id,
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

exports.fetchUser = async function(req, res, next) {
    try {
        let user = await db.User.findById(req.params.id);
        let { id } = user;
        let token = jwt.sign({
            id,
        }, process.env.SECRET_KEY);
        return res.status(200).json({
            id: user._id,
            first_name: user.first_name,
            last_name: user.last_name,
            email: user.email,
            school: user.school,
            program: user.program,
            graduation_year: user.graduation_year,
            gender: user.gender,
            country: user.country,
            state: user.state,
            city: user.city,
            token,
        });
    } catch(e) {
        return next({
            status: 400,
            message:  e.message,
        });
    }
};

exports.updateUser = async function(req, res, next) {
    try {
        let user = await db.User.findById(req.params.id);
        let { id } = user;
        let token = jwt.sign({
            id,
        }, process.env.SECRET_KEY);
        Object.keys(req.body).map(key => {
            user[key] = req.body[key];
        });
        await user.save();
        copyUser = JSON.parse(JSON.stringify(user));
        delete copyUser.password;
        res.status(200).json({
            ...copyUser,
            token,
        });
    } catch(e) {
        return next({
            status: 400,
            message:  e.message,
        })
    }
};

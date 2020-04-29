const db = require('../models');
const jwt = require('jsonwebtoken');

exports.signin = async function(req, res, next) {
    try {
        let user = await db.User.findOne({
            email: req.body.email
        });
        let { _id, role } = user;
        let isMatch = await user.comparePassword(req.body.password);
        if(isMatch) {
            let token = jwt.sign({
                _id,
            }, process.env.SECRET_KEY);
            return res.status(200).json({
                _id,
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
            role: 'superadmin',
        });
        let { _id, role } = user;
        let token = jwt.sign({
            _id,
        }, process.env.SECRET_KEY);
        return res.status(200).json({
            _id,
            role,
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

exports.fetchUser = async (req, res, next) => {
    try {
        let user = await db.User.findById(req.params._id);
        let { _id, role } = user;
        let token = jwt.sign({
            _id,
        }, process.env.SECRET_KEY);
        copyUser = JSON.parse(JSON.stringify(user));
        delete copyUser.password;
        delete copyUser.role;
        return res.status(200).json({
            ...copyUser,
            token,
        });
    } catch(e) {
        return next(e);
    }
};

exports.updateUser = async function(req, res, next) {
    try {
        let user = await db.User.findById(req.params._id);
        let { _id } = user;
        let token = jwt.sign({
            _id,
        }, process.env.SECRET_KEY);
        Object.keys(req.body)
        .filter(key => key != 'role')
        .map(key => {
            user[key] = req.body[key];
        });
        await user.save();
        copyUser = JSON.parse(JSON.stringify(user));
        delete copyUser.password;
        delete copyUser.role;
        res.status(200).json({
            ...copyUser,
            token,
        });
    } catch(e) {
        return next(e)
    }
};

const db = require('../models');

exports.fetchUsers = async function(req, res, next) {
    try {
        let post = await db.post.findById(req.params.post_id);
        let users = await db.user.find({
            '_id': {
                $in: post.applications
            }
        });
        res.status(200).json(users);
    } catch(e) {
        return next(e);
    }
}

exports.getUser = async function(req, res, next) {
    try {
        let user = await db.user.findById(req.params.user_id);
        res.status(200).json(user);
    } catch(e) {
        return next(e)
    }
};

exports.updateUser = async function(req, res, next) {
    try {
        let user = await db.user.findById(req.params.user_id);
        Object.keys(req.body).map(key => {
            user[key] = req.body[key];
        });
        await user.save();
        res.status(200).json({
            ...user,
            token,
        });
    } catch(e) {
        return next(e)
    }
};

exports.deleteUser = async function(req, res, next) {
    try {
        let foundUser = await db.user.findById(req.params.user_id);
        await foundUser.remove();
        res.status(200).json(foundUser);
    } catch(e) {
        return next(e)
    }
};

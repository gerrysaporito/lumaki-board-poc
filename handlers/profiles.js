const db = require('../models');

exports.getProfile = async function(req, res, next) {
    try {
        let user = await db.user.findById(req.params._id);
        let profile = await db[user.profile_type].findById(user.profile);
        res.status(200).json({
            ...profile._doc,
        });
    } catch(e) {
        return next(e)
    }
};

exports.updateProfile = async function(req, res, next) {
    let user = await db.user.findById(req.params._id);
    let profile = await db[user.profile_type].findById(user.profile);
    try {
        Object.keys(req.body).map(key => {
            profile[key] = req.body[key];
        });
        await profile.save();

        let posts = await db.post.find({
            '_id': {
                $in: profile.postings,
            }
        });

        for(let post of posts) {
            Object.keys(profile._doc)
            .filter(key !== '__v' || key !== '_id')
            .map(key => {
                post[key] = profile._doc[key];
            });
            await post.save();
        };

        res.status(200).json({
            ...profile._doc,
        });
    } catch(e) {
        return next({
            status: 401,
            message: profile
        })
    }
};

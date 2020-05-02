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
    try {
        let user = await db.user.findById(req.params._id);
        let profile = await db[user.profile_type].findById(user.profile);
        Object.keys(req.body).map(key => {
            profile[key] = req.body[key];
        });
        await profile.save();

        let jobs = await db.job.find({
            '_id': {
                $in: profile.applications,
            }
        });

        delete profile._doc.__v;
        for(let job of jobs) {
            Object.keys(profile._doc).map(key => {
                job[key] = profile._doc[key];
            });
            await job.save();
        };

        res.status(200).json({
            ...profile._doc,
        });
    } catch(e) {
        return next({
            status: 401,
            message: e.message
        })
    }
};

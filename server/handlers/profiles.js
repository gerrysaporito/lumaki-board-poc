const db = require('../models');

/*
* Function: Get a single profile from one of the profile collections.
*
* If successful, will:
*     - return the profile.
*/
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

/*
* Function: Updates a profile and the relevent entities that depends on their profile
*
* If successful, will:
*     - get the profile from the db.
*     - if necessary, updates all the postings associated with the profile.
*/
exports.updateProfile = async function(req, res, next) {
    try {
        let user = await db.user.findById(req.params._id);
        let profile = await db[user.profile_type].findById(user.profile);
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
            .filter(key => (key !== '__v' && key !== '_id'))
            .map(key => {
                post[key] = profile._doc[key];
            });
            await post.save();
        };

        res.status(200).json({
            ...profile._doc,
        });
    } catch(e) {
        return next(e);
    }
};

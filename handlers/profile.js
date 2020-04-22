const db = require('../models');

exports.createProfile = async function(req, res, next) {
    try {
        let profile = await db.Profile.create({
            school: req.params.school,
            program: req.params.program,
            graduation_year: req.params.graduation_year,
            gender:req.params.gender,
            user: req.params.id,
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.profiles.push(profile.id);
        await foundUser.save();
        let foundProfile = await db.Profile
        .findById(profile._id)
        .populate('user', {
            username: true,
            profileImageUrl: true,
        });
        return res.status(200).json(foundProfile);
    } catch(e) {
        return next(e)
    }
};

exports.getProfile = async function(req, res, next) {
    try {
        let profile = await db.Profile.find(req.params.profile_id);
        res.status(200).json(profile);
    } catch(e) {
        return next(e)
    }
};

exports.deleteProfile = async function(req, res, next) {
    try {
        let foundProfile = await db.Profile.findById(req.params.profile_id);
        await foundProfile.remove();
        res.status(200).json(foundProfile);
    } catch(e) {
        return next(e)
    }
};

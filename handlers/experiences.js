const db = require('../models');

exports.createExperience = async function(req, res, next) {
    try {
        let experience = await db.experience.create({
            ...req.body,
            user: req.params._id,
        });
        let user = await db.user.findById(req.params._id);
        let profile = await db[user.profile_type].findById(user.profile);
        profile.experiences.push(experience.id);
        await profile.save();
        let foundExperience = await db.experience.findById(experience._id);
        return res.status(200).json(foundExperience);
    } catch(e) {
        return next(e)
    }
};

exports.fetchExperiences = async function(req, res, next) {
    try {
        let user = await db.user.findById(req.params._id);
        let profile = await db[user.profile_type].findById(user.profile);
        let experiences = await db.experience.find({
            '_id': {
                $in: profile.experiences
            }
        });
        res.status(200).json(experiences);
    } catch(e) {
        return next(e);
    }
}

exports.getExperience = async function(req, res, next) {
    try {
        let experience = await db.experience.findById(req.params.experience_id);
        res.status(200).json(experience);
    } catch(e) {
        return next(e)
    }
};

exports.updateExperience = async function(req, res, next) {
    try {
        let experience = await db.experience.findById(req.params.experience_id);
        res.status(200).json(experience);
        Object.keys(req.body).map(key => {
            experience[key] = req.body[key];
        });
        await experience.save();
        res.status(200).json({
            ...experience,
            token,
        });
    } catch(e) {
        return next(e)
    }
};

exports.deleteExperience = async function(req, res, next) {
    try {
        let foundExperience = await db.experience.findById(req.params.experience_id);
        await foundExperience.remove();
        res.status(200).json(foundExperience);
    } catch(e) {
        return next(e)
    }
};

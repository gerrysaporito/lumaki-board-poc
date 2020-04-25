const db = require('../models');

exports.createExperience = async function(req, res, next) {
    try {
        let experience = await db.Experience.create({
            ...req.body,
            user: req.params.id,
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.experiences.push(experience.id);
        await foundUser.save();
        let foundExperience = await db.Experience.findById(experience._id);
        return res.status(200).json(foundExperience);
    } catch(e) {
        return next({
            status: 400,
            message: req.body.company
        })
    }
};

exports.fetchExperiences = async function(req, res, next) {
    try {
        let user = await db.User.findById(req.params.id);
        let experiences = await db.Experience.find({
            '_id': {
                $in: user.experiences
            }
        });
        res.status(200).json(experiences);
    } catch(e) {
        return next(e);
    }
}

exports.getExperience = async function(req, res, next) {
    try {
        let experience = await db.Experience.find(req.params.experience_id);
        res.status(200).json(experience);
    } catch(e) {
        return next(e)
    }
};

exports.deleteExperience = async function(req, res, next) {
    try {
        let foundExperience = await db.Experience.findById(req.params.experience_id);
        await foundExperience.remove();
        res.status(200).json(foundExperience);
    } catch(e) {
        return next(e)
    }
};

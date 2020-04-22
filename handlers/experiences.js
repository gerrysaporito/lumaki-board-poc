const db = require('../models');

exports.createExperience = async function(req, res, next) {
    try {
        let experience = await db.Experience.create({
            company: req.params.company,
            role: req.params.role, 
            description: req.params.description,
            start: req.params.start,
            end: req.params.end,
            user: req.params.id,
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.profile.experience.push(experience.id);
        await foundUser.save();
        let foundExperience = await db.Experience
        .findById(experience._id);
        return res.status(200).json(foundExperience);
    } catch(e) {
        return next(e)
    }
};

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

const db = require('../models');

exports.createSkill = async function(req, res, next) {
    try {
        let skill = await db.skill.create({
            ...req.body,
            user: req.params._id,
        });
        let user = await db.user.findById(req.params._id);
        let profile = await db[user.profile_type].findById(user.profile);
        profile.skills.push(skill.id);
        await profile.save();
        let foundSkill = await db.skill.findById(skill._id)
        return res.status(200).json(foundSkill);
    } catch(e) {
        return next(e)
    }
};

exports.fetchSkills = async function(req, res, next) {
    try {
        let user = await db.user.findById(req.params._id);
        let profile = await db[user.profile_type].findById(user.profile);
        let skills = await db.skill.find({
            '_id': {
                $in: profile.skills
            }
        });
        res.status(200).json(skills);
    } catch(e) {
        return next(e);
    }
}

exports.getSkill = async function(req, res, next) {
    try {
        let skill = await db.skill.findById(req.params.skill_id);
        res.status(200).json(skill);
    } catch(e) {
        return next(e)
    }
};

exports.deleteSkill = async function(req, res, next) {
    try {
        let foundSkill = await db.skill.findById(req.params.skill_id);
        await foundSkill.remove();
        res.status(200).json(foundSkill);
    } catch(e) {
        return next(e)
    }
};

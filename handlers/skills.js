const db = require('../models');

exports.createSkill = async function(req, res, next) {
    try {
        let skill = await db.Skill.create({
            ...req.body,
            user: req.params.id,
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.skills.push(skill.id);
        await foundUser.save();
        let foundSkill = await db.Skill.findById(skill._id)
        return res.status(200).json(foundSkill);
    } catch(e) {
        return next(e)
    }
};

exports.getSkill = async function(req, res, next) {
    try {
        let skill = await db.Skill.find(req.params.skill_id);
        res.status(200).json(skill);
    } catch(e) {
        return next(e)
    }
};

exports.deleteSkill = async function(req, res, next) {
    try {
        let foundSkill = await db.Skill.findById(req.params.skill_id);
        await foundSkill.remove();
        res.status(200).json(foundSkill);
    } catch(e) {
        return next(e)
    }
};

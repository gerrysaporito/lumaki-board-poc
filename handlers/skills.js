const db = require('../models');

/*
* Function: Creates a skill for a student_profile.
*
* If successful, will:
*     - create the skill and save to db.
*     - add the skill id to the user's student_profile.
*/
exports.createSkill = async function(req, res, next) {
    try {
        let user = await db.user.findById(req.params._id);
        let profile = await db[user.profile_type].findById(user.profile);
        for(let s of req.body.skill) {
            let skill = await db.skill.create({
                ...req.body,
                skill: s,
                user: req.params._id,
            });
            profile.skills.push(skill.id);
        }
        await profile.save();
        return res.status(200).json(req.body.skill);
    } catch(e) {
        return next(e)
    }
};

/*
* Function: Returns all skills from an array of skill ids from a student_profile.
*
* If successful, will:
*     - get the skill ids array form the user's student_profile.
*     - search the db for all skills using the array of skill ids.
*     - return an array of skills.
*/
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

/*
* Function: Get a single skill from the skill collection.
*
* If successful, will:
*     - return the skill.
*/
exports.getSkill = async function(req, res, next) {
    try {
        let skill = await db.skill.findById(req.params.skill_id);
        res.status(200).json(skill);
    } catch(e) {
        return next(e)
    }
};

/*
* Function: Removes a skill from a student_profile.
*
* If successful, will:
*     - remove the skill from the db.
*     - remove the skill id from the skills array in the user's profile
*       (Done using the pre-remove hook in the skill model).
*/
exports.deleteSkill = async function(req, res, next) {
    try {
        let foundSkill = await db.skill.findById(req.params.skill_id);
        await foundSkill.remove();
        res.status(200).json(foundSkill);
    } catch(e) {
        return next(e)
    }
};

const db = require('../models');

/*
* Function: Creates a experience for a student_profile.
*
* If successful, will:
*     - create the experience and save to db.
*     - add the experience id to the user's student_profile.
*/
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

/*
* Function: Returns all experiences from an array of experience ids from a student_profile.
*
* If successful, will:
*     - get the experience ids array form the user's student_profile.
*     - search the db for all experiences using the array of experience ids.
*     - return an array of experiences.
*/
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

/*
* Function: Get a single experience from the experience collection.
*
* If successful, will:
*     - return the experience.
*/
exports.getExperience = async function(req, res, next) {
    try {
        let experience = await db.experience.findById(req.params.experience_id);
        res.status(200).json(experience);
    } catch(e) {
        return next(e)
    }
};

/*
* Function: Updates an experience from a student_profile.
*
* If successful, will:
*     - get the experience from the db.
*     - update the experience by iterating over the key terms of the body of the
*       request and updating only those values.
*/
exports.updateExperience = async function(req, res, next) {
    try {
        let experience = await db.experience.findById(req.params.experience_id);
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

/*
* Function: Removes an experience from a student_profile.
*
* If successful, will:
*     - remove the experience from the db.
*     - remove the experience id from the experiences array in the user's profile
*       (Done using the pre-remove hook in the experience model).
*/
exports.deleteExperience = async function(req, res, next) {
    try {
        let foundExperience = await db.experience.findById(req.params.experience_id);
        await foundExperience.remove();
        res.status(200).json(foundExperience);
    } catch(e) {
        return next(e)
    }
};

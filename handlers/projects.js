const db = require('../models');

/*
* Function: Creates a project for a student_profile.
*
* If successful, will:
*     - create the project and save to db.
*     - add the project id to the user's student_profile.
*/
exports.createProject = async function(req, res, next) {
    try {
        let project = await db.project.create({
            ...req.body,
            user: req.params._id,
        });
        let user = await db.user.findById(req.params._id);
        let profile = await db[user.profile_type].findById(user.profile);
        profile.projects.push(project.id);
        await profile.save();
        let foundProject = await db.project.findById(project._id)
        return res.status(200).json(foundProject);
    } catch(e) {
        return next(e)
    }
};

/*
* Function: Returns all projects from an array of projects ids from a student_profile.
*
* If successful, will:
*     - get the project ids array form the user's student_profile.
*     - search the db for all projects using the array of project ids.
*     - return an array of project.
*/
exports.fetchProjects = async function(req, res, next) {
    try {
        let user = await db.user.findById(req.params._id);
        let profile = await db[user.profile_type].findById(user.profile);
        let projects = await db.project.find({
            '_id': {
                $in: profile.projects
            }
        });
        res.status(200).json(projects);
    } catch(e) {
        return next(e);
    }
}

/*
* Function: Get a single project from the project collection.
*
* If successful, will:
*     - return the project.
*/
exports.getProject = async function(req, res, next) {
    try {
        let project = await db.project.findById(req.params.project_id);
        res.status(200).json(project);
    } catch(e) {
        return next(e)
    }
};

/*
* Function: Updates a project from a student_profile.
*
* If successful, will:
*     - get the project from the db.
*     - update the project by iterating over the key terms of the body of the
*       request and updating only those values.
*/
exports.updateProject = async function(req, res, next) {
    try {
        let project = await db.project.findById(req.params.project_id);
        res.status(200).json(project);
        Object.keys(req.body).map(key => {
            project[key] = req.body[key];
        });
        await project.save();
        res.status(200).json({
            ...project,
            token,
        });
    } catch(e) {
        return next(e)
    }
};

/*
* Function: Removes a project from a student_profile.
*
* If successful, will:
*     - remove the project from the db.
*     - remove the project id from the projects array in the user's profile
*       (Done using the pre-remove hook in the project model).
*/
exports.deleteProject = async function(req, res, next) {
    try {
        let foundProject = await db.project.findById(req.params.project_id);
        await foundProject.remove();
        res.status(200).json(foundProject);
    } catch(e) {
        return next(e)
    }
};

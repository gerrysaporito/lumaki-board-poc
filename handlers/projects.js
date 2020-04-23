const db = require('../models');

exports.createProject = async function(req, res, next) {
    try {
        let project = await db.Project.create({
            description: req.body.description,
            user: req.params.id,
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.profile.projects.push(project.id);
        await foundUser.save();
        let foundProject = await db.Project
        .findById(project._id)
        return res.status(200).json(foundProject);
    } catch(e) {
        return next(e)
    }
};

exports.getProject = async function(req, res, next) {
    try {
        let project = await db.Project.find(req.params.project_id);
        res.status(200).json(project);
    } catch(e) {
        return next(e)
    }
};

exports.deleteProject = async function(req, res, next) {
    try {
        let foundProject = await db.Project.findById(req.params.project_id);
        await foundProject.remove();
        res.status(200).json(foundProject);
    } catch(e) {
        return next(e)
    }
};
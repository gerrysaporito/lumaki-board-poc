const db = require('../models');

exports.createProject = async function(req, res, next) {
    try {
        let project = await db.Project.create({
            ...req.body,
            user: req.params.id,
        });
        let foundUser = await db.User.findById(req.params.id);
        foundUser.projects.push(project.id);
        await foundUser.save();
        let foundProject = await db.Project.findById(project._id)
        return res.status(200).json(foundProject);
    } catch(e) {
        return next({
            status: 400,
            message: e.message
        })
    }
};

exports.fetchProjects = async function(req, res, next) {
    try {
        let user = await db.User.findById(req.params.id);
        let projects = await db.Project.find({
            '_id': {
                $in: user.projects
            }
        });
        res.status(200).json(projects);
    } catch(e) {
        return next(e);
    }
}

exports.getProject = async function(req, res, next) {
    try {
        let project = await db.Project.findById(req.params.project_id);
        res.status(200).json(project);
    } catch(e) {
        return next(e)
    }
};

exports.updateProject = async function(req, res, next) {
    try {
        let project = await db.Project.findById(req.params.project_id);
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

exports.deleteProject = async function(req, res, next) {
    try {
        let foundProject = await db.Project.findById(req.params.project_id);
        await foundProject.remove();
        res.status(200).json(foundProject);
    } catch(e) {
        return next(e)
    }
};

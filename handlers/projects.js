const db = require('../models');

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
        return next({
            status: 400,
            message: e.message
        })
    }
};

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

exports.getProject = async function(req, res, next) {
    try {
        let project = await db.project.findById(req.params.project_id);
        res.status(200).json(project);
    } catch(e) {
        return next(e)
    }
};

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

exports.deleteProject = async function(req, res, next) {
    try {
        let foundProject = await db.project.findById(req.params.project_id);
        await foundProject.remove();
        res.status(200).json(foundProject);
    } catch(e) {
        return next(e)
    }
};

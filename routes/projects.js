const express = require('express');
const router = express.Router({ mergeParams: true });
const { createProject, getProject, deleteProject, fetchProjects, updateProject } = require('../handlers/projects');

router.route('/')
    .get(fetchProjects)
    .post(createProject);

router.route('/:project_id')
    .delete(deleteProject)
    .post(updateProject)
    .get(getProject);

module.exports = router;

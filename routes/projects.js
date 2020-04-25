const express = require('express');
const router = express.Router({ mergeParams: true });
const { createProject, getProject, deleteProject, fetchProjects } = require('../handlers/projects');

router.route('/')
    .get(fetchProjects)
    .post(createProject);

router.route('/:project_id')
    .delete(deleteProject)
    .get(getProject);

module.exports = router;

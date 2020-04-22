const express = require('express');
const router = express.Router({ mergeParams: true });
const { createProject, getProject, deleteProject } = require('../handlers/projects');

router.route('/')
    .post(createProject);

router.route('/:project_id')
    .delete(deleteProject)
    .get(getProject);

module.exports = router;

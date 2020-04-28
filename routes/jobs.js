const express = require('express');
const router = express.Router({ mergeParams: true });
const { createJob, updateJob, deleteJob } = require('../handlers/jobs');

router.route('/')
    .post(createJob)

router.route('/:job_id')
    .delete(deleteJob)
    .post(updateJob)

module.exports = router;

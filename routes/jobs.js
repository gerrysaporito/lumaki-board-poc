const express = require('express');
const router = express.Router({ mergeParams: true });
const { createJob, updateJob, deleteJob, applyJob } = require('../handlers/jobs');

router.route('/')
    .post(createJob)

router.route('/:job_id')
    .delete(deleteJob)
    .post(updateJob)

router.route('/:job_id/apply')
    .post(applyJob)

module.exports = router;

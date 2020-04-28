const express = require('express');
const router = express.Router({ mergeParams: true });
const { createJob, getJob, deleteJob, fetchJobs, updateJob } = require('../handlers/jobs');

router.route('/')
    .get(fetchJobs)
    .post(createJob);

router.route('/:job_id')
    .delete(deleteJob)
    .post(updateJob)
    .get(getJob);

module.exports = router;

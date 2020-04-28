const express = require('express');
const router = express.Router({ mergeParams: true });
const { getJob, deleteJob, fetchJobs, updateJob } = require('../handlers/jobs');

router.route('/search')
    .post(fetchJobs);

router.route('/:job_id')
    .get(getJob);

module.exports = router;

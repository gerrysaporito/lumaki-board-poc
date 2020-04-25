const express = require('express');
const router = express.Router({ mergeParams: true });
const { createExperience, getExperience, deleteExperience, fetchExperiences } = require('../handlers/experiences');

router.route('/')
    .get(fetchExperiences)
    .post(createExperience);

router.route('/:experience_id')
    .delete(deleteExperience)
    .get(getExperience);

module.exports = router;

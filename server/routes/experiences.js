const express = require('express');
const router = express.Router({ mergeParams: true });
const { createExperience, getExperience, deleteExperience, fetchExperiences, updateExperience } = require('../handlers/experiences');

router.route('/')
    .get(fetchExperiences)
    .post(createExperience);

router.route('/:experience_id')
    .delete(deleteExperience)
    .post(updateExperience)
    .get(getExperience);

module.exports = router;

const express = require('express');
const router = express.Router({ mergeParams: true });
const { createExperience, getExperience, deleteExperience } = require('../handlers/experiences');

router.route('/')
    .post(createExperience);

router.route('/:experience_id')
    .delete(deleteExperience)
    .get(getExperience);

module.exports = router;

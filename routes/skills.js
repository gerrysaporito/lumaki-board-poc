const express = require('express');
const router = express.Router({ mergeParams: true });
const { createSkill, getSkill, deleteSkill } = require('../handlers/skills');

router.route('/')
    .post(createSkill);

router.route('/:skill_id')
    .delete(deleteSkill)
    .get(getSkill);

module.exports = router;

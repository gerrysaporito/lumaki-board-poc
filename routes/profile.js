const express = require('express');
const router = express.Router({ mergeParams: true });
const { createProfile, getProfile, deleteProfile } = require('../handlers/profile');

router.route('/')
    .post(createProfile);

router.route('/:profile_id')
    .delete(deleteProfile)
    .get(getProfile);

module.exports = router;

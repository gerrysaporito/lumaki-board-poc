const express = require('express');
const router = express.Router({ mergeParams: true });
const { getProfile, updateProfile } = require('../handlers/profiles');

router.route('/')
    .get(getProfile)
    .post(updateProfile);

module.exports = router;

const express = require('express');
const router = express.Router({ mergeParams: true });
const { checkAdminRole } = require('../middleware/auth');
const {} = require('../handlers/user');

router.route('/')

module.exports = router;

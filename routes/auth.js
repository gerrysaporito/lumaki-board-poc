const express = require('express');
const router = express.Router({ mergeParams: true });
const { loginRequired, ensureCorrectUser } = require('../middleware/auth');
const { signin, signup, fetchUser, updateUser } = require('../handlers/auth');

router.post('/login', signin);
router.post('/register', signup);
router.get('/users/:_id', loginRequired, ensureCorrectUser, fetchUser);
router.post('/users/:_id', loginRequired, ensureCorrectUser, updateUser);

module.exports = router;

const express = require('express');
const router = express.Router();
const { signin, signup } = require('../handlers/auth');

router.post('/login', signin);
router.post('/register', signup);

module.exports = router;

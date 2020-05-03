const express = require('express');
const router = express.Router({ mergeParams: true });
const { getPost, fetchPosts } = require('../handlers/posts');

router.route('/search')
    .post(fetchPosts);

router.route('/:post_id')
    .get(getPost);

module.exports = router;

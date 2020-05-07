const express = require('express');
const router = express.Router({ mergeParams: true });
const { createPost, updatePost, deletePost, getApplicantsFromPost, applyPost } = require('../handlers/posts');

router.route('/')
    .post(createPost)

router.route('/:post_id')
    .delete(deletePost)
    .post(updatePost)

router.route('/:post_id/applicants')
    .get(getApplicantsFromPost)

router.route('/:post_id/apply')
    .get(applyPost)

module.exports = router;

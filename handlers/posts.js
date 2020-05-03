const db = require('../models');

exports.createPost = async function(req, res, next) {
    try {
        let user = await db.user.findById(req.params._id);
        let profile = await db[user.profile_type].findById(user.profile);
        let post = await db.post.create({
            ...req.body,
            ...profile._doc,
            user_id: req.params._id,
            duration: dateToWeek(req.body.start_date, req.body.end_date),
        });
        profile.applications.push(post.id);
        await profile.save();
        let foundPost = await db.post.findById(post._id)
        return res.status(200).json(foundPost);
    } catch(e) {
        return next(e)
    }
};

exports.fetchPosts = async function(req, res, next) {
    try {
        let posts = await db.post.find({...req.body});
        res.status(200).json(posts);
    } catch(e) {
        return next(e);
    }
}

exports.getPost = async function(req, res, next) {
    try {
        let post = await db.post.findById(req.params.post_id);
        res.status(200).json(post);
    } catch(e) {
        return next(e)
    }
};

exports.updatePost = async function(req, res, next) {
    try {
        let post = await db.post.findById(req.params.post_id);
        res.status(200).json(post);
        Object.keys(req.body).map(key => {
            post[key] = req.body[key];
        });
        await post.save();
        res.status(200).json({
            ...post,
            token,
        });
    } catch(e) {
        return next(e)
    }
};

exports.deletePost = async function(req, res, next) {
    try {
        let foundPost = await db.post.findById(req.params.post_id);
        await foundPost.remove();
        res.status(200).json(foundPost);
    } catch(e) {
        return next(e)
    }
};

exports.applyPost = async function(req, res, next) {
    try {
        let error = false;
        let user = await db.user.findById(req.params._id);
        let profile = await db[user.profile_type].findById(user.profile);
        let post = await db.post.findById(req.params.post_id);

        if (!post.applications.includes(user._id)) {
            post.applications.push(user._id);
            post.save();
        } else {
            error = true;
        }

        if (!profile.applications.includes(post._id)) {
            profile.applications.push(post._id);
            profile.save();
        } else {
            error = true;
        }

        if (error) {
            next({
                status: 400,
                message: 'You have already applied to this post',
            })
        } else {
            res.status(200).json({
                posts: post.applications,
                profile: profile.applications,
            })
        }
    } catch(e) {
        return next(e);
    }
}

function dateToWeek(start_date, end_date) {
    let first = new Date(start_date);
    let second = new Date(end_date)
    return Math.round((second-first)/(1000*60*60*24*7));
}

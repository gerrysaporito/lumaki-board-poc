const db = require('../models');

/*
* Function: Creates a new job posting.
*
* If successful, will:
*     - create the new posting from the employer)_profile and body of
*       body of the request and save to db.
*     - add the posting id to the user's employer_profile.
*/
exports.createPost = async function(req, res, next) {
    try {
        let user = await db.user.findById(req.params._id);
        let profile = await db[user.profile_type].findById(user.profile);
        let copyProfile = JSON.parse(JSON.stringify(profile));
        delete copyProfile._id;
        delete copyProfile.__v;
        let post = await db.post.create({
            ...req.body,
            ...copyProfile,
            user_id: req.params._id,
            duration: dateToWeek(req.body.start_date, req.body.end_date),
        });
        profile.postings.push(post._id);
        await profile.save();
        let foundPost = await db.post.findById(post._id)
        return res.status(200).json(foundPost);
    } catch(e) {
        return next(e)
    }
};


/*
* Function: Returns all job postings from an array of posting ids from an employer_profile.
*
* If successful, will:
*     - get the posting ids array form the user's employer_profile.
*     - search the db for all postings using filter parameters passed through the
*       body of the request.
*     - return an array of postings.
*/
exports.fetchPosts = async function(req, res, next) {
    try {
        let posts = await db.post.find({...req.body});
        res.status(200).json(posts);
    } catch(e) {
        return next(e);
    }
}

/*
* Function: Get a single job posting from the postings collection.
*
* If successful, will:
*     - return the posting.
*/
exports.getPost = async function(req, res, next) {
    try {
        let post = await db.post.findById(req.params.post_id);
        res.status(200).json(post);
    } catch(e) {
        return next(e)
    }
};

/*
* Function: Gets an array of applicants from a job posting.
*
* If successful, will:
*     - get the post from the db.
*     - create an array of users with their infromation populated.
*     - return the array of users
*/
exports.getApplicantsFromPost = async function(req, res, next) {
    try {
        let post = await db.post.findById(req.params.post_id);
        let userInfo = [];
        let users = await db.user.find({
            '_id': {
                $in: post.applications
            }
        });
        for(let user of users) {
            let profile = await db[user.profile_type].findById(user.profile);
            let experiences = await db.experience.find({
                '_id': {
                    $in: profile.experiences
                }
            });
            let projects = await db.project.find({
                '_id': {
                    $in: profile.projects
                }
            });
            let skills = await db.skill.find({
                '_id': {
                    $in: profile.skills
                }
            });
            userInfo.push({
                user: user,
                profile: {
                    ...profile._doc,
                    experiences: experiences,
                    projects: projects,
                    skills: skills
                },
            });
        };
        res.status(200).json(userInfo);
    } catch(e) {
        return next(e)
    }
};

/*
* Function: Updates a job posting from an employer_profile.
*
* If successful, will:
*     - get the post from the db.
*     - update the post by iterating over the key terms of the body of the
*       request and updating only those values.
*/
exports.updatePost = async function(req, res, next) {
    try {
        let post = await db.post.findById(req.params.post_id);
        Object.keys(req.body).map(key => {
            post[key] = req.body[key];
        });
        post.duration = dateToWeek(req.body.start_date, req.body.end_date);
        await post.save();

        res.status(200).json({
            ...post,
            token,
        });
    } catch(e) {
        return next(e)
    }
};

/*
* Function: Removes an job posting from an employer_profile.
*
* If successful, will:
*     - remove the posting from the db.
*     - remove the posting id from the postings array in the user's profile
*       (Done using the pre-remove hook in the posting model).
*/
exports.deletePost = async function(req, res, next) {
    try {
        let foundPost = await db.post.findById(req.params.post_id);
        await foundPost.remove();
        res.status(200).json(foundPost);
    } catch(e) {
        return next(e)
    }
};

/*
* Function: Adds a user with a student_profile id to the job posting's applications.
*
* If successful, will:
*     - get the user and posting from the db.
*     - check to see if the user applied already.
*     - add the user to the posting's application array or
*       return an error notifying the user has already applied to this posting.
*/
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

/*
* Function: Converts two seperate dates to number of weeks.
*
* If successful, will:
*     - return the number of weeks between 2 dates.
*/
function dateToWeek(start_date, end_date) {
    let first = new Date(start_date);
    let second = new Date(end_date)
    return Math.round((second-first)/(1000*60*60*24*7));
}

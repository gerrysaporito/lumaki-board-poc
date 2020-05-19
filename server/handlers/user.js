const db = require('../models');

/*
* Function: Returns all users from an array of users ids from a job posting.
*
* If successful, will:
*     - get the user ids array form the posting.
*     - search the db for all users using the array of user ids.
*     - return an array of users.
*/
exports.fetchUsers = async function(req, res, next) {
    try {
        let post = await db.post.findById(req.params.post_id);
        let users = await db.user.find({
            '_id': {
                $in: post.applications
            }
        });
        res.status(200).json(users);
    } catch(e) {
        return next(e);
    }
}

/*
* Function: Get a single experience from the experience collection.
*
* If successful, will:
*     - return the experience.
*/
exports.getUser = async function(req, res, next) {
    try {
        let user = await db.user.findById(req.params.user_id);
        res.status(200).json(user);
    } catch(e) {
        return next(e)
    }
};

/*
* Function: Updates a user.
*
* If successful, will:
*     - get the user from the db.
*     - update the user by iterating over the key terms of the body of the
*       request and updating only those values.
*/
exports.updateUser = async function(req, res, next) {
    try {
        let user = await db.user.findById(req.params.user_id);
        Object.keys(req.body).map(key => {
            user[key] = req.body[key];
        });
        await user.save();
        res.status(200).json({
            ...user,
            token,
        });
    } catch(e) {
        return next(e)
    }
};

/*
* Function: Removes a user.
*
* If successful, will:
*     - remove the user from the db.
*/
exports.deleteUser = async function(req, res, next) {
    try {
        let foundUser = await db.user.findById(req.params.user_id);
        await foundUser.remove();
        res.status(200).json(foundUser);
    } catch(e) {
        return next(e)
    }
};

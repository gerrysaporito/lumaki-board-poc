require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../models');

/*
* Function: Checks to see if a user is logged in.
* (Authentication)
*
* If successful, will allow the request to proceed.
* If failed, will return an error to the client prompting them to login.
*/
exports.loginRequired = function(req, res, next) {
    try {
        const token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function(e, decoded) {
            if(decoded) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: 'Please log in first.',
                });
            }
        });
    } catch(e) {
        return next({
            status: 401,
            message: 'Please log in first.',
        });
    }
};

/*
* Function: Checks to see if the request is authorized.
* In other words, ensures the request is from the real user and not an imposter.
* (Authorization)
*
* If successful, will allow the request to proceed.
* If failed, will return a vague error to the client.
*/
exports.ensureCorrectUser = function(req, res, next) {
    try {
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function(e, decoded) {
            if(decoded && decoded._id === req.params._id) {
                return next();
            } else {
                return next({
                    status: 401,
                    message: 'Unauthorized.',
                    // {
                    //     decoded: decoded,
                    //     decoded_id: decoded._id,
                    //     req: req.params,
                    //     url: req.protocol + '://' + req.get('host') + req.originalUrl
                    // }
                });
            }
        })
    } catch(e) {
        return next({
            status: 401,
            message: 'Unauthorized.',
        });
    }
};

/*
* Function: Checks to see if the request came from an admin user.
* (Authorization)
*
* If successful, will allow the request to proceed.
* If failed, will return a vague error to the client.
*/
exports.checkAdminRole = async function(req, res, next) {
    try {
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function(e, decoded) {
            if(decoded && decoded._id === req.params._id) {
                getUserById(req.params._id)
                .then(user => {
                    if(user.role === 'admin' || user.role === 'superadmin') {
                        return next();
                    } else {
                        return next({
                            status: 401,
                            message: 'Unauthorized.',
                        });
                    }
                })
            } else {
                return next({
                    status: 401,
                    message: 'Unauthorized.',
                });
            }
        })
    } catch(e) {
        return next({
            status: 401,
            message: e.message
        });
    }
};

/*
* Function: Checks to see if the request came from an superadmin user.
* (Authorization)
*
* If successful, will allow the request to proceed.
* If failed, will return a vague error to the client.
*/
exports.checkSuperAdminRole = function(req, res, next) {
    try {
        let token = req.headers.authorization.split(' ')[1];
        jwt.verify(token, process.env.SECRET_KEY, function(e, decoded) {
            if(decoded && decoded._id === req.params._id) {
                getUserById(req.params._id)
                .then(user => {
                    if(user.role === 'admin' || user.role === 'superadmin') {
                        return next();
                    } else {
                        return next({
                            status: 401,
                            message: 'Unauthorized.',
                        });
                    }
                })
            } else {
                return next({
                    status: 401,
                    message: 'Unauthorized.',
                });
            }
        })
    } catch(e) {
        return next({
            status: 401,
            message: 'Unauthorized.'
        });
    }
};

/*
* Function: Async functino to get a user by Id.
*
* @params id: string;
* @return: user document from MongoDb;
*/
const getUserById = async function(id){
    return user = await db.user.findById(id);
}

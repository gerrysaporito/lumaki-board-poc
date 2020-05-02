require('dotenv').config();
const jwt = require('jsonwebtoken');
const db = require('../models');

// Authentication
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

// Authorization
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

// Admin
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

// Super Admin
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

const getUserById = async function(id){
    return user = await db.user.findById(id);
}

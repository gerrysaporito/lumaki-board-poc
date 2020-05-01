const db = require('../models');

exports.createJob = async function(req, res, next) {
    try {
        let job = await db.job.create({
            ...req.body,
            user_id: req.params._id,
            duration: dateToWeek(req.body.start_date, req.body.end_date),
        });
        let user = await db.user.findById(req.params._id);
        let profile = await db[user.profile_type].findById(user.profile);
        profile.jobs.push(job.id);
        await profile.save();
        let foundJob = await db.job.findById(job._id)
        return res.status(200).json(foundJob);
    } catch(e) {
        return next(e)
    }
};

exports.fetchJobs = async function(req, res, next) {
    try {
        let jobs = await db.job.find({...req.body});
        res.status(200).json(jobs);
    } catch(e) {
        return next(e);
    }
}

exports.getJob = async function(req, res, next) {
    try {
        let job = await db.job.findById(req.params.job_id);
        res.status(200).json(job);
    } catch(e) {
        return next(e)
    }
};

exports.updateJob = async function(req, res, next) {
    try {
        let job = await db.job.findById(req.params.job_id);
        res.status(200).json(job);
        Object.keys(req.body).map(key => {
            job[key] = req.body[key];
        });
        await job.save();
        res.status(200).json({
            ...job,
            token,
        });
    } catch(e) {
        return next(e)
    }
};

exports.deleteJob = async function(req, res, next) {
    try {
        let foundJob = await db.job.findById(req.params.job_id);
        await foundJob.remove();
        res.status(200).json(foundJob);
    } catch(e) {
        return next(e)
    }
};

exports.applyJob = async function(req, res, next) {
    try {
        let user = await db.user.findById(req.params._id);
        let profile = await db[user.profile_type].findById(user.profile);
        let job = await db.job.findById(req.params.job_id);
        job.applications.push(user._id);
        profile.applications.push(job._id);
        job.save();
        profile.save();
        res.status(200).json({
            jobs: job.applications,
            profile: profile.applications,
        })
    } catch(e) {
        return next(e);
    }
}

function dateToWeek(start_date, end_date) {
    let first = new Date(start_date);
    let second = new Date(end_date)
    return Math.round((second-first)/(1000*60*60*24*7));
}

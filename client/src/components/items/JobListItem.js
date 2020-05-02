import React from 'react';
import { Link } from 'react-router-dom';

import { IndustryColorValues } from '../../common/Definitions';
import './css/JobListItem.css';

const JobListItem = ({_id, company, link, image, position, job_industry, location, duration, position_description, removeJob, currentUser, canAccess}) => (
    <div className='job-list-item'>
        <div className='job-industry-color-bar' style={{backgroundColor: IndustryColorValues[job_industry] || 'green',}} />
        <div>
            <img src={image} alt={`${company} Logo`} />
            <p className='company'><strong><Link to={`/jobs/${_id}`}>{company}</Link></strong></p>
            <p><i>{position}</i></p>
        </div>
        <p className='position-description'>{position_description}</p>
        <div className='tags'>
            <div className='tag'>
                <strong>Industry:</strong>
                <span style={{
                    backgroundColor: IndustryColorValues[job_industry] || 'green',
                    color: 'rgb(97, 95, 95)',
                }}>{job_industry}</span>
            </div>
            <div className='tag'>
                <strong>Location:</strong>
                <span>{location}</span>
            </div>
            <div className='tag'>
                <strong>Duration:</strong>
                <span>{duration} weeks</span>
            </div>
            <div className='cta'>
                {canAccess && (
                    <React.Fragment>
                        <Link to={`/users/${currentUser.user._id}/jobs/postings/${_id}/edit`}><i className="fas fa-pencil-alt" /></Link>
                        <button onClick={removeJob}><i className="far fa-trash-alt" /></button>
                    </React.Fragment>
                )}
                <Link to={`/jobs/${_id}`}>Read More ></Link>
            </div>
        </div>
    </div>
)

export default JobListItem;

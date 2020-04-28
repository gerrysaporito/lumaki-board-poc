import React from 'react';
import { Link } from 'react-router-dom';

import { IndustryColorValues } from '../../common/Definitions';
import './css/JobListItem.css';

const JobListItem = ({_id, company, link, image, position, industry, location, start_date, end_date, position_description, removeJob, currentUser, isCorrectUser}) => (
    <div className='job-list-item'>
        <div className='industry-color-bar' style={{backgroundColor: IndustryColorValues[industry]}} />
        <div>
            <img src={image} />
            <p className='company'><strong><Link to={`/jobs/${_id}`}>{company}</Link></strong></p>
            <p><i>{position}</i></p>
        </div>
        <p className='position-description'>{position_description}</p>
        <div className='tags'>
            <div className='tag'>
                <strong>Industry:</strong>
                <span style={{
                    backgroundColor: IndustryColorValues[industry],
                    color: 'rgb(97, 95, 95)',
                }}>{industry}</span>
            </div>
            <div className='tag'>
                <strong>Location:</strong>
                <span>{location}</span>
            </div>
            <div className='tag'>
                <strong>Duration:</strong>
                <span>{datediff(start_date, end_date)} weeks</span>
            </div>
            <div className='cta'>
                {isCorrectUser && (
                    <React.Fragment>
                        <Link to={`/users/${currentUser.user.id}/jobs/${_id}/edit`}><i className="fas fa-pencil-alt" /></Link>
                        <button onClick={removeJob}><i className="far fa-trash-alt" /></button>
                    </React.Fragment>
                )}
                <Link to={`/jobs/${_id}`}>Read More ></Link>
            </div>
        </div>
    </div>
)

function datediff(start_date, end_date) {
    let first = new Date(start_date);
    let second = new Date(end_date)
    return Math.round((second-first)/(1000*60*60*24*7));
}

export default JobListItem;

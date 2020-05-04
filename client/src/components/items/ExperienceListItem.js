import React from 'react';
import { Link } from 'react-router-dom';

import './css/ExperienceListItem.css';

const ExperienceListItem = ({_id, company, role, description, start_date, end_date, removeExperience, currentUser, isCorrectUser}) => (
    <div className='experience-list-item'>
        <div className='experience-list-item-area'>
            <p><strong>{company}</strong></p>
            <p>{role}</p>
            <p>{formatDate(start_date)} - {formatDate(end_date)}</p>
            <p className='description'>{description}</p>
            {isCorrectUser && (
                <div className='function-tools'>
                    <button onClick={removeExperience}><i className='far fa-trash-alt' /></button>
                    <Link to={`/users/${currentUser.user._id}/experiences/${_id}/edit`}><i className='fas fa-pencil-alt' /></Link>
                </div>
            )}
        </div>
    </div>
)

function formatDate(dateString) {
    let date = new Date(dateString)
    let year = date.getFullYear().toString();
    let month = (date.getMonth() + 101).toString().substring(1);
    let day = (date.getDate() + 100).toString().substring(1);
    return `${year}/${month}/${day}`;
}

export default ExperienceListItem;

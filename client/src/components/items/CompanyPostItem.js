import React from 'react';
import { Link } from 'react-router-dom';

import { Routes } from '../../common/Routes';
import Card from '../general/Card';
import './css/CompanyPostItem.css';

const CompanyPostItem = ({_id, position, duration, datePosted, totalApplicants, currentUser}) => (
    <Card type='bump'>
        <div className='company-post-list-item'>
            <div className='title-section'>
                <p className='title'>
                    <strong><Link to={Routes.SinglePostApplicants.url
                    .replace(':user_id', currentUser.user._id).replace(':post_id', _id)}>
                        {position}
                    </Link></strong>
                </p>
                <p>Duration: {duration} weeks</p>
            </div>
            <p className='date-section'>{datePosted}</p>
            <p className='applicants-section'><strong>{totalApplicants} Applicants</strong></p>

            <Link className='link-section' to={Routes.SinglePostApplicants.url
                .replace(':user_id', currentUser.user._id).replace(':post_id', _id)}>
                <i className="fas fa-chevron-right" />
            </Link>
        </div>
    </Card>
)

export default CompanyPostItem;

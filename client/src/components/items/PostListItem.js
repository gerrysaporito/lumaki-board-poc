import React from 'react';
import { Link } from 'react-router-dom';

import { Routes } from '../../common/Routes'
import { IndustryColorValues } from '../../common/Definitions';
import './css/PostListItem.css';

const PostListItem = ({_id, company, link, image, position, post_industry, location, duration, position_description, removePost, currentUser, canAccess}) => (
    <div className='post-list-item'>
        <div className='post-industry-color-bar' style={{backgroundColor: IndustryColorValues[post_industry] || 'green',}} />
        <div>
            <img src={image} alt={`${company} Logo`} />
            <p className='company'><strong><Link to={`/posts/${_id}`}>{company}</Link></strong></p>
            <p><i>{position}</i></p>
        </div>
        <p className='position-description'>{position_description}</p>
        <div className='tags'>
            <div className='tag'>
                <strong>Industry:</strong>
                <span style={{
                    backgroundColor: IndustryColorValues[post_industry] || 'green',
                    color: 'rgb(97, 95, 95)',
                }}>{post_industry}</span>
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
                        <Link to={Routes.editPost.url.replace(':user_id', currentUser.user._id)}><i className="fas fa-pencil-alt" /></Link>
                        <button onClick={removePost}><i className="far fa-trash-alt" /></button>
                    </React.Fragment>
                )}
                <Link to={`/posts/${_id}`}>Read More ></Link>
            </div>
        </div>
    </div>
)

export default PostListItem;

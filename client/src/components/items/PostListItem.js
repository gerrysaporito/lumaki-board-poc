import React from 'react';
import { Link } from 'react-router-dom';

import { Routes } from '../../common/Routes';
import { Content } from '../../common/Content';
import { IndustryColorValues } from '../../common/Definitions';
import './css/PostListItem.css';

const PostListItem = ({_id, company, image, position, post_industry, location, duration, position_description, removePost, currentUser, canAccess, editable}) => (
    <div className='post-list-item'>
        <div className='post-industry-color-bar' style={{backgroundColor: IndustryColorValues[post_industry] || 'green',}} />
        <section>
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
            </div>
        </section>
        <div className='cta'>
            {canAccess && editable ? (
                <React.Fragment>
                    <Link to={Routes.editPost.url.replace(':user_id', currentUser.user._id).replace(':post_id', _id)}>
                        {Content.companyPosts.buttonText.edit}
                    </Link>
                    <Link to={`/posts/${_id}`} className='middle'>
                        {Content.companyPosts.buttonText.view}
                    </Link>
                    <button onClick={removePost}>
                        {(<i className='far fa-trash-alt' />) || Content.companyPosts.buttonText.delete}
                    </button>
                </React.Fragment>
            ) : (
                <Link to={`/posts/${_id}`}>Read More ></Link>
            )}
        </div>
    </div>
)

export default PostListItem;

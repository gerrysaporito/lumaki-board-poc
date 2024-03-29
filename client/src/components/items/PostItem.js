import React from 'react';
import { Link } from 'react-router-dom';

import { Routes } from '../../common/Routes';
import { Content } from '../../common/Content';
import { IndustryColorValues } from '../../common/Definitions';
import Card from '../general/Card';
import './css/PostItem.css';

const PostItem = ({_id, company, image, position, post_industry, location, duration, position_description, removePost, currentUser, canAccess, editable, ghost}) => (
    <Card type='bump mini'>
        <div className='post-list-item'>
            <div className='post-industry-color-bar' style={{backgroundColor: IndustryColorValues[post_industry] || 'green',}} />
            <section>
                <div>
                    <img src={image} alt={`${company} Logo`} />
                    <p className='company'><strong><Link to={`/posts/${_id}`}>{company}</Link></strong></p>
                    <p><i>{position}</i></p>
                </div>
                <p className='position-description details'>{position_description}</p>
                <div className='tags'>
                    <div className='tag details'>
                        <strong>Industry:</strong>
                        <span style={{
                            backgroundColor: IndustryColorValues[post_industry] || '',
                            color: 'rgb(97, 95, 95)',
                        }}>{post_industry}</span>
                    </div>
                    <div className='tag details'>
                        <strong>Location:</strong>
                        <span>{location}</span>
                    </div>
                    <div className='tag details'>
                        <strong>Duration:</strong>
                        <span>{duration} weeks</span>
                    </div>
                </div>
            </section>
            <div className={canAccess && editable ? 'cta-edit details' : 'cta details'}>
                {canAccess && editable ? (
                    <React.Fragment>
                        <Link to={Routes.editPost.url.replace(':user_id', currentUser.user._id).replace(':post_id', _id)}>
                            {Content.MyPostings.buttonText.edit}
                        </Link>
                        <Link to={`/posts/${_id}`} className='middle'>
                            {Content.MyPostings.buttonText.view}
                        </Link>
                        <button onClick={removePost}>
                            {(<i className='far fa-trash-alt' />) || Content.MyPostings.buttonText.delete}
                        </button>
                    </React.Fragment>
                ) : (
                    <Link to={`/posts/${_id}`}>Read More ></Link>
                )}
            </div>
        </div>
    </Card>
)

export default PostItem;

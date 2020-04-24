import React from 'react';
import Moment from 'react-moment';
import { Link } from 'react-router-dom';
import DefaultProfileImage from '../images/default-profile-image.jpg';

const ExperienceListItem = ({text, removeMessage, isCorrectUser}) => (
    <div>
        <li className='list-group-item'>
            <div className='experience-list-item-area'>
                <Link to="/">@ &nbsp;</Link>
                <p>{text}</p>
                {isCorrectUser && (
                    <button className='btn btn-danger' onClick={removeMessage} href='#'>Delete</button>
                )}
            </div>
        </li>
    </div>
)

export default ExperienceListItem;

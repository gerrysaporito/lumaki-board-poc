import React from 'react';
import { Link } from 'react-router-dom';

import Card from '../general/Card';
import './css/ProjectItem.css';

const ProjectItem = ({_id, description, removeProject, currentUser, isCorrectUser}) => (
    <Card type='bump'>
        <div className='project-list-item'>
            <div className='project-list-item-area'>
                <p className='description'>{description}</p>
                {isCorrectUser && (
                    <div className='function-tools'>
                        <a href='!#' onClick={removeProject}><i className='far fa-trash-alt' /></a>
                        <Link to={`/users/${currentUser.user._id}/projects/${_id}/edit`} ><i className='fas fa-pencil-alt' /></Link>
                    </div>
                )}
            </div>
        </div>
    </Card>
);

export default ProjectItem;

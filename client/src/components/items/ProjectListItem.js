import React from 'react';
import { Link } from 'react-router-dom';

import './css/ProjectListItem.css';

const ProjectListItem = ({_id, description, removeProject, currentUser, isCorrectUser}) => (
    <div className='project-list-item'>
        <div className='project-list-item-area'>
            <p className='description'>{description}</p>
            {isCorrectUser && (
                <div className='function-tools'>
                    <button onClick={removeProject}><i className="far fa-trash-alt" /></button>
                    <Link to={`/users/${currentUser.user.id}/projects/${_id}/edit`} ><i className="fas fa-pencil-alt" /></Link>
                </div>
            )}
        </div>
    </div>
)

export default ProjectListItem;

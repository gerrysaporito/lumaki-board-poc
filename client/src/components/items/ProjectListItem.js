import React from 'react';

import './css/ProjectListItem.css';

const ProjectListItem = ({description, removeProject, isCorrectUser}) => (
    <div className='project-list-item'>
        <div className='project-list-item-area'>
            <p className='description'>{description}</p>
            {isCorrectUser && (
                <div className='function-tools'>
                    <button onClick={removeProject}><i className="far fa-trash-alt" /></button>
                    <button ><i className="fas fa-pencil-alt" /></button>
                </div>
            )}
        </div>
    </div>
)

export default ProjectListItem;

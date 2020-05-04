import React from 'react';

import './css/SkillListItem.css';

const SkillListItem = ({skill, removeSkill, isCorrectUser}) => (
    <div className='skill-list-item'>
        <div className='skill-list-item-area'>
            <p className='skill'>{skill}</p>
            {isCorrectUser && (
                <button onClick={removeSkill}><i className='far fa-trash-alt' /></button>
            )}
        </div>
    </div>
)

export default SkillListItem;

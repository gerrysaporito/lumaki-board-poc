import React from 'react';

import Card from '../Card';
import './css/SkillListItem.css';

const SkillListItem = ({skill, removeSkill, isCorrectUser}) => (
    <Card type='bump inline'>
        <div className='skill-list-item'>
            <div className='skill-list-item-area'>
                <p className='skill'>{skill}</p>
                {isCorrectUser && (
                    <button onClick={removeSkill}><i className='far fa-trash-alt' /></button>
                )}
            </div>
        </div>
    </Card>
);

export default SkillListItem;

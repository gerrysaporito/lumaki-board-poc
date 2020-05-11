import React from 'react';

import Card from '../general/Card';
import './css/SkillItem.css';

const SkillItem = ({skill, removeSkill, isCorrectUser}) => (
    <Card type='bump inline'>
        <div className='skill-list-item'>
            <div className='skill-list-item-area'>
                <p className='skill'>{skill}</p>
                {isCorrectUser && (
                    <a href='!#' onClick={removeSkill}><i className='far fa-trash-alt' /></a>
                )}
            </div>
        </div>
    </Card>
);

export default SkillItem;

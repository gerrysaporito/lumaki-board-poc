import React from 'react';
import './css/Card.css';

const Card = props => {
    let classes = 'card ';
    if (props.type) {
        let types = props.type.split(' ');
        if(types.includes('bump')){
            classes += 'bump-card ';
        }
        if (types.includes('inline')) {
            classes += 'inline-card ';
        }
        if (types.includes('mini')) {
            classes += 'mini-card ';
        }
        if (types.includes('form')) {
            classes += 'form-card ';
        }
    }

    return (
        <div className={classes}>
            {props.children}
        </div>
    )
}

export default Card;

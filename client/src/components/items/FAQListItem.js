import React from 'react';
import './css/FAQListItem.css';

const FAQListItem = ({question, answer}) => (
    <div className='faq-list-item'>
        <div>
            <h5>{question}</h5>
            <p>{answer}</p>
        </div>
    </div>
)

export default FAQListItem;

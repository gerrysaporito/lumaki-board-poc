import React from 'react';
import './css/FAQListItem.css';
import Card from '../Card';

const FAQListItem = ({question, answer}) => (
    <Card>
        <div className='faq-list-item'>
            <div>
                <p className='subheader'>{question}</p>
                <p>{answer}</p>
            </div>
        </div>
    </Card>
);

export default FAQListItem;

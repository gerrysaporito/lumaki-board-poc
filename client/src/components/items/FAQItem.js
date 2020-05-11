import React from 'react';
import './css/FAQItem.css';
import Card from '../general/Card';

const FAQItem = ({question, answer}) => (
    <Card>
        <div className='faq-list-item'>
            <div>
                <p className='subheader'>{question}</p>
                <p>{answer}</p>
            </div>
        </div>
    </Card>
);

export default FAQItem;

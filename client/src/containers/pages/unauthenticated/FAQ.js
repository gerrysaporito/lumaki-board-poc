import React, { Component } from 'react';

import { Content } from '../../../common/Content';
import FAQItem from '../../../components/items/FAQItem';

import './css/FAQ.css';

class FAQ extends Component {
    render() {
        let faqs = Content.faq.content.map((faq, i) => (
            <FAQItem key={i} {...faq} />
        ));
        return(
            <div id='faq'>
                <p className='header'>{Content.faq.title}</p>
                <div className='faq-list'>
                    {faqs}
                </div>
            </div>
        )
    }
}

export default FAQ;

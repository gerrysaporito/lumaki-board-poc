import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Content } from '../../common/Content';
import FAQListItem from '../../components/items/FAQListItem';

import './css/FAQ.css';

class FAQ extends Component {
    render() {
        let faqs = Content.faq.content.map((faq, i) => (
            <FAQListItem key={i} {...faq} />
        ));
        return(
            <div className='mt-5' id='faq'>
                <h3 className='title'>{Content.faq.title}</h3>
                <div className='faq-list'>
                    {faqs}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps, {})(FAQ);

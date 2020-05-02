import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Content } from '../../common/Content';

import ContactForm from '../forms/ContactForm';
import './css/Contact.css';

class Contact extends Component {
    render() {
        return(
            <div className='mt-5' id='contact'>
                <ContactForm {...Content.forms.contact.general} />
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
    }
}

export default connect(mapStateToProps, {})(Contact);

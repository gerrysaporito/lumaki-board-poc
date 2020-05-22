import React, { Component } from 'react';

import { Content } from '../../../common/Content';
import ContactForm from '../../forms/ContactForm';
import './css/Contact.css';

/*
* Page layout for the general contact form.
*/
class Contact extends Component {
    render() {
        return(
            <div id='contact'>
                <ContactForm {...Content.forms.contact.general} />
            </div>
        )
    }
}

export default Contact;

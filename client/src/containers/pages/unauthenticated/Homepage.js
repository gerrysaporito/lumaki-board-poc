import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';

import { Content } from '../../../common/Content';
import Card from '../../../components/general/Card';
import './css/Homepage.css';

/*
* Page layout for the homepage.
*/
const Homepage = props => {
    if(props.currentUser.isAuthenticated) {
        return (
            <div id='homepage'>
                <p className='header'>{Content.homepage.unauthenticated.title}</p>
                <p className='subheader'>{Content.homepage.unauthenticated.subTitle}</p>
                <div className='cards'>
                    <div className='card-container'><Card></Card></div>
                    <div className='card-container'><Card></Card></div>
                </div>
            </div>
        )
    } else {
        let cards = Content.homepage.unauthenticated.cards.map((card, i) => (
            <div key={i} className='card-container'>
                <Card >
                    <p className='title'>{card.title}</p>
                    <p>{card.subTitle}</p>
                    <Link to={card.link} className='lumaki-btn'>{card.buttonText}</Link>
                </Card>
            </div>
        ));
        return (
            <div id='homepage'>
                <p className='header'>{Content.homepage.unauthenticated.title}</p>
                <p className='subheader'>{Content.homepage.unauthenticated.subTitle}</p>
                <div className='cards'>
                    {cards}
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {})(Homepage);

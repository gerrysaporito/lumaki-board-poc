import React from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';
import { Content } from '../common/Content';
import './css/Homepage.css';

const Homepage = props => {
    if(props.currentUser.isAuthenticated) {
        return (
            <div id='homepage'>
                <h1>{Content.homepage.unauthenticated.title}</h1>
                <h4>{Content.homepage.unauthenticated.subTitle}</h4>
                <div className='tiles'>
                    <div className='tile'></div>
                    <div className='tile'></div>
                </div>
            </div>
        )
    } else {
        let tiles = Content.homepage.unauthenticated.tiles.map((tile, i) => (
            <div key={i} className='tile'>
                <h5>{tile.title}</h5>
                <p>{tile.subTitle}</p>
                <Link to={tile.link} className='lumaki-btn'>{tile.buttonText}</Link>
            </div>
        ))
        return (
            <div id='homepage'>
                <h1>{Content.homepage.unauthenticated.title}</h1>
                <h4>{Content.homepage.unauthenticated.subTitle}</h4>
                <div className='tiles'>
                    {tiles}
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

export default connect(mapStateToProps, {})(Homepage);

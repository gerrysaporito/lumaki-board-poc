import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Routes } from '../../common/Routes';
import { Content } from '../../common/Content';
import { fetchPosts } from '../../store/actions/posts';
import './css/EmployerRegister.css';

class CompanyPosts extends Component {
    constructor(props) {
        super(props);
        this.state = {
            posts: [],
        }
    }

    componentDidMount() {
        console.log(this.props.profile)
        this.props.fetchPosts({
            '_id': {
                $in: this.props.profile.postings,
            }
        })
        .then(() => this.setState({
            posts: [],
        }))
        .catch(() => {});
    }

    render() {
        return(
            <div className='mt-5' id='employer-register'>
                <div className='section'>
                    <h3><strong>{Content.companyPosts.title}</strong></h3>
                    <p>{Content.companyPosts.subTitle}</p>
                    <div className='hr' />
                    <div className='section'>
                        <div className='post-list'>

                        </div>
                    </div>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        profile: state.profile,
    }
}

export default connect(mapStateToProps, {fetchPosts})(CompanyPosts);

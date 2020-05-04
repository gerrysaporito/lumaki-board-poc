import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { removePost } from '../../store/actions/posts';
import { Routes } from '../../common/Routes';
import { Content } from '../../common/Content';
import { fetchPosts } from '../../store/actions/posts';
import Tabs from '../../components/Tabs';
import './css/CompanyApplications.css';

class CompanyApplications extends Component {
    componentDidMount() {
        this.props.fetchPosts({
            'user_id': this.props.currentUser.user._id,
        })
        .then(() => {})
        .catch(() => {});
    }

    render() {
        const {posts, currentUser, removePost} = this.props;

        return(
            <div className='mt-5' id='company-applicants'>
                <div className='section'>
                    <h3><strong>{Content.companyApplications.title}</strong></h3>
                    <Tabs>
                        <div label={Content.companyApplications.buttonText.all}>
                            all applicants
                        </div>
                        <div label={Content.companyApplications.buttonText.saved}>
                            my favourite applicants
                        </div>
                        <div label={Content.companyApplications.buttonText.pipeline}>
                            not sure what this is
                        </div>
                    </Tabs>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
        posts: state.posts,
    }
}

export default connect(mapStateToProps, {fetchPosts, removePost})(CompanyApplications);

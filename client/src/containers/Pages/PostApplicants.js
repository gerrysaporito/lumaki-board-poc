import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { removePost } from '../../store/actions/posts';
import { Routes } from '../../common/Routes';
import { Content } from '../../common/Content';
import { fetchPosts, getApplicantsFromPost } from '../../store/actions/posts';
import Header from '../../components//Header';
import ApplicantList from '../lists/ApplicantList';
import './css/CompanyApplications.css';

class PostApplicants extends Component {
    constructor(props) {
        super(props);
        this.state = {
            applicants: [],
        }
    }

    componentDidMount() {
        const post_id = this.props.match.params.post_id;
        const user_id = this.props.match.params.user_id;
        this.props.getApplicantsFromPost(user_id, post_id)
        .then(applicants => this.setState({
            applicants: applicants,
        }))
        .catch(() => {});
    }

    render() {
        const {applicants} = this.state;
        return(
            <div id='company-applicants'>
                <div className='section'>
                    <Header header={Content.companyApplications.title} history={this.props.history} />
                    <ApplicantList applicants={applicants} />
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

export default connect(mapStateToProps, {getApplicantsFromPost})(PostApplicants);

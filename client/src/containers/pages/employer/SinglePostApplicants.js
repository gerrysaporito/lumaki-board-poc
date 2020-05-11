import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Content } from '../../../common/Content';
import { getApplicantsFromPost } from '../../../store/actions/posts';
import Header from '../../../components/general/Header';
import ApplicantList from '../../../components/lists/ApplicantList';
import './css/CompanyApplications.css';

class SinglePostApplicants extends Component {
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
        const {applicants, currentUser} = this.state;
        return(
            <div id='company-applicants'>
                <div className='section'>
                    <Header header={Content.ViewApplicants.title} history={this.props.history} />
                    <ApplicantList applicants={applicants} currentUser={currentUser} />
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

export default connect(mapStateToProps, {getApplicantsFromPost})(SinglePostApplicants);

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { removePost } from '../../../store/actions/posts';
import { Content } from '../../../common/Content';
import { fetchPosts } from '../../../store/actions/posts';
import Tabs from '../../../components/tabs/Tabs';
import CompanyPostList from '../../../components/lists/CompanyPostList';
import './css/CompanyApplications.css';

class ViewApplicants extends Component {
    componentDidMount() {
        this.props.fetchPosts({
            'user_id': this.props.currentUser.user._id,
        })
        .then(() => {})
        .catch(() => {});
    }

    render() {
        const {posts, currentUser} = this.props;

        return(
            <div id='company-applicants'>
                <div className='section'>
                    <p className='header'>{Content.ViewApplicants.title}</p>
                    <Tabs>
                        <div label={Content.ViewApplicants.buttonText.all}>
                            <CompanyPostList currentUser={currentUser} posts={posts} />
                        </div>
                        <div label={Content.ViewApplicants.buttonText.saved}>
                            my favourite applicants
                        </div>
                        <div label={Content.ViewApplicants.buttonText.pipeline}>
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

export default connect(mapStateToProps, {fetchPosts, removePost})(ViewApplicants);

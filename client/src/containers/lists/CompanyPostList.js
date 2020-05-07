import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Months } from '../../common/Definitions';
import CompanyPostListItem from '../../components/items/CompanyPostListItem';
import './css/PostList.css';

class CompanyPostList extends Component {
    render() {
        const {posts, removePost, currentUser} = this.props;
        let postList = posts.map(m => (
            <CompanyPostListItem
                key={m._id}
                {...m}
                datePosted={formatDate(m.createdAt)}
                totalApplicants={m.applications.length}
                currentUser={currentUser}
            />
        ));
        return(
            <div className='post-list'>
                <div className='company-post-list-item company-post-list-item-title'>
                        <div className='title-section' />
                        <p className='date-section'>Date Posted</p>
                        <p className='applicants-section'>Number of Applicants</p>
                </div>
                {postList}
            </div>
        )
    }
}

function formatDate(dateString) {
    let date = new Date(dateString)
    let year = date.getFullYear();
    let month = date.getMonth();
    let day = date.getDate();
    return `${Months[month]} ${day}, ${year}`;
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        currentUser: state.currentUser,
    };
}

export default connect(mapStateToProps, {})(CompanyPostList);

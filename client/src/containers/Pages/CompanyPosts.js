import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { removePost } from '../../store/actions/posts';
import { Routes } from '../../common/Routes';
import { Content } from '../../common/Content';
import { fetchPosts } from '../../store/actions/posts';
import PostListItem from '../../components/items/PostListItem';
import './css/EmployerRegister.css';

class CompanyPosts extends Component {
    componentDidMount() {
        this.props.fetchPosts({
            'user_id': this.props.currentUser.user._id,
        })
        .then(() => {})
        .catch(() => {});
    }

    render() {
        const {posts, currentUser, removePost} = this.props;
        let postList = posts.map(m => (
            <PostListItem
                key={m._id}
                {...m}
                removePost={removePost.bind(this, m.user_id, m._id)}
                canAccess={currentUser.user._id === m.user_id}
                currentUser={currentUser}
                editable
            />
        ));

        return(
            <div className='mt-5' id='company-posts'>
                <div className='section'>
                    <h3><strong>{Content.companyPosts.title}</strong></h3>
                    <p>{Content.companyPosts.subTitle}</p>
                    <div className='hr' />
                    <div className='section'>
                        <div className='post-list'>
                            {postList}
                            <Link to={Routes.createPost.url} className='post-list-item add-card'>
                                <i className='fa fa-plus' aria-hidden='true' />
                            </Link>
                        </div>
                    </div>
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

export default connect(mapStateToProps, {fetchPosts, removePost})(CompanyPosts);

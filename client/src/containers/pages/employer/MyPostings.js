import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { removePost, fetchPosts } from '../../../store/actions/posts';
import { Routes } from '../../../common/Routes';
import { Content } from '../../../common/Content';
import PostItem from '../../../components/items/PostItem';
import Card from '../../../components/general/Card';

class MyPostings extends Component {
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
            <PostItem
                key={m._id}
                {...m}
                removePost={removePost.bind(this, m.user_id, m._id)}
                canAccess={currentUser.user._id === m.user_id}
                currentUser={currentUser}
                editable
            />
        ));

        return(
            <div id='company-posts'>
                <div className='section'>
                    <p className='header'><strong>{Content.MyPostings.title}</strong></p>
                    <p>{Content.MyPostings.subTitle}</p>
                    <div className='hr' />
                    <div className='section'>
                        <div className='post-list'>
                            {postList}
                            <Card type='mini'>
                                <Link to={Routes.createPost.url.replace(':user_id', currentUser.user._id)} className='post-list-item add-card'>
                                    <i className='fa fa-plus' aria-hidden='true' /><br />
                                    Add Card
                                </Link>
                            </Card>
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

export default connect(mapStateToProps, {fetchPosts, removePost})(MyPostings);

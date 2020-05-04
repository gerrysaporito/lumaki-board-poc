import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostListItem from '../../components/items/PostListItem';
import './css/PostList.css';

class PostList extends Component {
    render() {
        const {posts, removePost, currentUser} = this.props;
        let postList = posts.map(m => (
            <PostListItem
                key={m._id}
                {...m}
                canAccess={currentUser.user._id === m.user_id}
                currentUser={currentUser}
                editable
            />
        ));
        return(
            <div className='post-list'>
                {postList}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        posts: state.posts,
        currentUser: state.currentUser,
    };
}

export default connect(mapStateToProps, {})(PostList);

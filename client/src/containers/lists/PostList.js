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
        if (posts.length % 4 !== 0) {
            for(let i = 0; i < posts.length; ++i) {
                postList.push(
                    <div className='ghost'>
                        <PostListItem
                            key={posts.length + i}
                            canAccess={currentUser.user._id === 0}
                            currentUser={currentUser}
                            ghost
                        />
                    </div>
                )
            }
        }
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

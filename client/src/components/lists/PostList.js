import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostItem from '../../components/items/PostItem';
import './css/PostList.css';

class PostList extends Component {
    render() {
        const {posts, currentUser} = this.props;
        let postList = posts.map(m => (
            <PostItem
                key={m._id}
                {...m}
                canAccess={currentUser.user._id === m.user_id}
                currentUser={currentUser}
                editable
            />
        ));
        if (posts.length % 4 !== 0) {
            for(let i = 0; i < posts.length % 4; ++i) {
                postList.push(
                    <div key={i} className='ghost'>
                        <PostItem
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

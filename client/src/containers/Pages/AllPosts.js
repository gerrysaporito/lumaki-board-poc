import React, { Component } from 'react';
import { connect } from 'react-redux';

import PostsFilter from '../forms/PostsFilter';
import PostList from '../lists/PostList';

import './css/AllPosts.css';

class AllPosts extends Component {
    render() {
        return(
            <div className='' id='all-posts'>
                <PostsFilter />
                <div className='section'>
                    <PostList />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, {})(AllPosts);

import React, { Component } from 'react';

import PostsFilter from '../../forms/PostsFilter';
import PostList from '../../../components/lists/PostList';

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

export default AllPosts;

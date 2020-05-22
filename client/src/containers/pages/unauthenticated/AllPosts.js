import React, { Component } from 'react';

import PostList from '../../../components/lists/PostList';
import PostsFilter from '../../forms/PostsFilter';
import './css/AllPosts.css';

/*
* Page layout for all job postings.
*/
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

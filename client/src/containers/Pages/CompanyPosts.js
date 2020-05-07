import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { removePost } from '../../store/actions/posts';
import { Routes } from '../../common/Routes';
import { Content } from '../../common/Content';
import { fetchPosts } from '../../store/actions/posts';
import PostListItem from '../../components/items/PostListItem';
import './css/EmployerRegister.css';
import Card from '../../components/Card';

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
            <div id='company-posts'>
                <div className='section'>
                    <p className='header'><strong>{Content.companyPosts.title}</strong></p>
                    <p>{Content.companyPosts.subTitle}</p>
                    <div className='hr' />
                    <div className='section'>
                        <div className='post-list'>
                            {postList}
                            <Card type='mini'>
                                <Link to={Routes.createPost.url} className='post-list-item add-card'>
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

export default connect(mapStateToProps, {fetchPosts, removePost})(CompanyPosts);

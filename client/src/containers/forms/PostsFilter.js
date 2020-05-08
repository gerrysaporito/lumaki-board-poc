import React, { Component } from 'react';
import { connect } from 'react-redux';

import { IndustryValues } from '../../common/Definitions';
import { fetchPosts } from '../../store/actions/posts';

import './css/PostsFilter.css';

class PostsFilter extends Component {
    constructor(props) {
        super(props);
        this.state = {
            post_industry: '',
            duration: '',
        }
    }

    componentDidMount(){
        this.props.fetchPosts({})
        .then(() => this.setState({
            post_industry: '',
            duration: '',
        }))
        .catch(() => {});
    }

    handleChange = e => {
        this.setState(
            {
                [e.target.name]: e.target.value
            }, function() {
                let filterObj = {};
                Object.keys(this.state)
                .filter(key => this.state[key] !== '')
                .forEach(key => filterObj[key] = this.state[key]);
                this.props.fetchPosts(filterObj)
                    .then(() => {})
                    .catch(() => {})
                return;
            }
        );
    }

    render() {
        const {post_industry, duration} = this.state;
        return(
            <div id='posts-filter'>
                <div className='filter'>
                    <label htmlFor='post_industry'>Industry:</label>
                    <select id='post_industry' name='post_industry' onChange={this.handleChange} value={post_industry} >
                        <option value=''>Any</option>
                        {Object.values(IndustryValues).map((post_industry, i) => (
                            <option key={i} value={post_industry || ''}>{post_industry}</option>
                        ))}
                    </select>
                </div>

                <div className='filter'>
                    <label htmlFor='duration'>Duration (weeks):</label>
                    <input id='duration' name='duration' onChange={this.handleChange} value={duration || 'any'} min='0' type='number' />
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, { fetchPosts })(PostsFilter);

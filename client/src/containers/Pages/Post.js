import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Content } from '../../common/Content';
import { Routes } from '../../common/Routes';
import { IndustryColorValues, Profiles } from '../../common/Definitions';
import { getPost, applyToPost } from '../../store/actions/posts';
import { ERROR } from '../../store/actionTypes';

import './css/Post.css';

class Post extends Component {
    constructor(props) {
        super(props);
        this.state = {
            company: '',
            link: '',
            image: '',
            position: '',
            industry: '',
            location: '',
            start_date: '',
            end_date: '',
            company_description: '',
            position_description: '',
            responsibilities: [],
            requirements: [],
            compensation: [],
        };
    };

    componentDidMount() {
        const post_id = this.props.match.params.post_id;
        this.props.getPost(post_id, {_id: post_id})
        .then(post => this.setState({
            ...post,
            start_date: formatDate(post.start_date),
            end_date: formatDate(post.end_date),
        }))
        .catch(() => {});
    }

    handleApplyClick = e => {
        e.preventDefault();
        const post_id = this.props.match.params.post_id;
        this.props.applyToPost(post_id);
    }

    render() {
        const button = [];
        switch(this.props.currentUser.user.profile_type) {
            case Profiles.student: {
                button.push(<button key={1} className='lumaki-btn apply' onClick={this.handleApplyClick}>Apply Now</button>);
                break;
            }
            case Profiles.employer: {
                break;
            }
            default: {
                button.push(<Link key={1} to={Routes.login.url} className='lumaki-btn-outline apply'>Login</Link>);
                break;
            }
        }
        return(
            <div id='post-container'>
                <div className='post'>
                    <div className='tile'>
                        <div className='post-industry-color-bar' style={{backgroundColor: IndustryColorValues[this.state.post_industry]}} />
                        <div className='content'>
                            {this.props.alerts.alert === ERROR && this.props.alerts.message && (
                                <div className='error'>
                                    <div className='alert alert-danger'>
                                        {this.props.alerts.message}
                                    </div>
                                </div>
                            )}
                            <img src={this.state.image} alt={`${this.state.company} Logo`} />
                            <p className='position'>{this.state.position}</p>
                            <p className='company'>{this.state.company}</p>
                            <p className='location'>{this.state.location}</p>
                            <p className='duration'><strong>Duration:</strong> {datediff(this.state.start_date, this.state.end_date)} weeks</p>
                            <div className='description'>
                                <p className='title'><strong>Company Description:</strong></p>
                                <p>{this.state.company_description}</p>
                            </div>
                        </div>
                    </div>

                    <div className='tile'>
                        <div className='content'>
                            <h3>{`${Content.post.title.description} ${this.state.company}`}</h3>
                            <p>{this.state.position_description}</p>
                            <div className='description'>
                                <p className='title'><strong>Responsibilities:</strong></p>
                                <ul>
                                    {this.state.responsibilities.map((resp, i) => (<li key={i}>{resp.text}</li>))}
                                </ul>
                            </div>
                        </div>
                    </div>

                    <div className='tile'>
                        <div className='content'>
                            <h3>{`${Content.post.title.requirements}`}</h3>
                            <ul>
                                {this.state.requirements.map((req, i) => (<li key={i}>{req.text}</li>))}
                            </ul>
                        </div>
                    </div>

                    <div className='tile'>
                        <div className='content'>
                            <h3>{`${Content.post.title.compensation}`}</h3>
                            <ul>
                                {this.state.compensation.map((req, i) => (<li key={i}>{req.text}</li>))}
                            </ul>
                        </div>
                    </div>
                    {button}
                </div>
            </div>
        )
    }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function datediff(start_date, end_date) {
    let first = new Date(start_date);
    let second = new Date(end_date)
    return Math.round((second-first)/(1000*60*60*24*7));
}


function mapStateToProps(state) {
    return {
        alerts: state.alerts,
        currentUser: state.currentUser,
        Content: Content,
    }
}

export default connect(mapStateToProps, { getPost, applyToPost })(Post);

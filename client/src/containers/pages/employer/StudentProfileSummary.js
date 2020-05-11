import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import { connect } from 'react-redux';

import { Content } from '../../../common/Content';
import { Routes } from '../../../common/Routes';
import { IndustryColorValues, Profiles } from '../../../common/Definitions';
import { getProfile } from '../../../store/actions/profiles';
import { ERROR } from '../../../store/actionTypes';
import Card from '../../../components/general/Card';

class StudentProfileSummary extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: '',
            program: '',
            graduation_date: '',
            gender: '',
            country: '',
            state: '',
            city: '',
            experiences: [],
            projects: [],
            skills: [],
        };
    };

    componentDidMount() {
        const student_id = this.props.match.params.user_id;
        this.props.getProfile(student_id)
        .then(profile => this.setState({
            ...profile,
            graduation_date: formatDate(profile.graduation_date),
        }))
        .catch(() => {});
    }

    handleApplyClick = e => {
        e.preventDefault();
    }

    render() {
        console.log(this.state)
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
                    <Card>
                        <div className='post-industry-color-bar' style={{backgroundColor: IndustryColorValues[this.state.post_industry]}} />
                        <div className='card-content'>
                            {this.props.alerts.alert === ERROR && this.props.alerts.message && (
                                <div className='error'>
                                    <div className='alert alert-danger'>
                                        {this.props.alerts.message}
                                    </div>
                                </div>
                            )}
                            <img src={this.state.image} alt={`${this.state.company} Logo`} />
                            <p className='position'>{this.state.position}</p>
                            <p>{this.state.company}</p>
                            <p>{this.state.location}</p>
                            <p className='duration'><strong>Duration:</strong> {datediff(this.state.start_date, this.state.end_date)} weeks</p>
                            <div className='description'>
                                <p className='title'><strong>Company Description:</strong></p>
                                {/* <p>{this.state.company_description}</p> */}
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className='card-content'>
                            <p className='subheader'>{`${Content.post.title.description} ${this.state.company}`}</p>
                            <p>{this.state.position_description}</p>
                            <div className='description'>
                                <p className='title'><strong>Responsibilities:</strong></p>
                                <ul>
                                    {/* {this.state.responsibilities.map((resp, i) => (<li key={i}>{resp.text}</li>))} */}
                                </ul>
                            </div>
                        </div>
                    </Card>

                    <Card>
                        <div className='card-content'>
                            <p className='subheader'>{`${Content.post.title.requirements}`}</p>
                            <ul>
                                {/* {this.state.requirements.map((req, i) => (<li key={i}>{req.text}</li>))} */}
                            </ul>
                        </div>
                    </Card>

                    <Card>
                        <div className='card-content'>
                            <p className='subheader'>{`${Content.post.title.compensation}`}</p>
                            <ul>
                                {/* {this.state.compensation.map((req, i) => (<li key={i}>{req.text}</li>))} */}
                            </ul>
                        </div>
                    </Card>
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

export default connect(mapStateToProps, { getProfile })(StudentProfileSummary);

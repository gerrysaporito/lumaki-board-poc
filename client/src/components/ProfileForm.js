import React, { Component } from 'react';
import { connect } from 'react-redux';

import { SUCCESS } from '../store/actionTypes';
import { fetchUserProfile, updateUserProfile } from '../store/actions/auth';

import './css/ProfileForm.css';

class ProfileForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            school: '',
            program: '',
            graduation_year: '',
            gender: '',
        }
    }

    componentDidMount(){
        this.props.fetchUserProfile(this.props.currentUser.user.id)
        .then(() => this.setState({
            school: this.props.currentUser.user.school || '',
            program: this.props.currentUser.user.program || '',
            graduation_year: formatDate(this.props.currentUser.user.graduation_year) || '',
            gender: this.props.currentUser.user.gender || '',
        }))
        .catch(() => {});
    }

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleSubmit = e => {
        e.preventDefault();
        console.log(this.state)
        this.props.updateUserProfile({...this.state})
        .then(() => {})
        .catch(() => {
            return;
        });
    }

    render() {
        const {school, program, graduation_year, gender} = this.state;
        const {alerts, history, removeAlert, currentUser} = this.props;
        history.listen(() => {
            removeAlert();
        });
        return(
            <div>
                <div className='mt-5' id='profileform'>
                    <h4 className='mb-5'>Welcome <span className='name'>{currentUser.user.first_name}</span>!</h4>
                    <form onSubmit={this.handleSubmit} className='profileform'>
                        {alerts.alert === SUCCESS && alerts.message && (
                            <div className='alert alert-success'>{alerts.message}</div>
                        )}
                        <label htmlFor='school'>School:</label>
                        <input className='form-control' id='school' name='school' onChange={this.handleChange} value={school} type='text' />
                        <label htmlFor='program'>Program:</label>
                        <input className='form-control' id='program' name='program' onChange={this.handleChange} value={program} type='text' />
                        <label htmlFor='graduation_year'>Graduation Year:</label>
                        <input className='form-control' id='graduation_year' name='graduation_year' onChange={this.handleChange} value={graduation_year} type='date' />
                        <label htmlFor='gender'>Gender:</label>
                        <select className="btn btn-outline-dark dropdown-toggle" id="gender" name='gender' onChange={this.handleChange} value={gender}>
                            <option value="female">Female</option>
                            <option value="male">Male</option>
                            <option value="other">Other</option>
                            <option value="not_specified">Prefer not to specify</option>
                        </select>
                        <button className='btn lumaki-btn btn-md mt-3' type='submit'>Save</button>
                    </form>
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

function mapStateToProps(state) {
    return {}
}

export default connect(mapStateToProps, { fetchUserProfile, updateUserProfile })(ProfileForm);

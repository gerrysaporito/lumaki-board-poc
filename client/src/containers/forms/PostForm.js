import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ERROR } from '../../store/actionTypes';

import { postNewPost, getPost, updatePost } from '../../store/actions/posts';
import { Content } from '../../common/Content';
import { IndustryValues } from '../../common/Definitions';
import Card from '../../components/general/Card';
import Header from '../../components/general/Header';
import './css/Form.css'

class PostForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            // company: '',
            // link: '',
            // image: '',
            position: '',
            post_industry: '',
            // location: '',
            start_date: '',
            end_date: '',
            // company_description: '',
            position_description: '',
            responsibilities: [''],
            requirements: [''],
            compensation: [''],
        };
    };

    componentDidMount() {
        if(this.props.location.pathname.split('/').pop() === 'edit') {
            const post_id = this.props.match.params.post_id;
            this.props.getPost(post_id)
            .then(post => this.setState({
                ...post,
                start_date: formatDate(post.start_date),
                end_date: formatDate(post.end_date),
            }))
            .catch(() => {});
        }
    }

    handleNewPost = e => {
        e.preventDefault();
        const post_id = this.props.match.params.post_id;
        if (this.props.location.pathname.split('/').pop() === 'edit') {
            this.props.updatePost({...this.state}, post_id);
        } else {
            this.props.postNewPost({...this.state});
        }
        this.setState({
            // company: '',
            // link: '',
            // image: '',
            position: '',
            post_industry: '',
            // location: '',
            start_date: '',
            end_date: '',
            // company_description: '',
            position_description: '',
            responsibilities: [''],
            requirements: [''],
            compensation: [''],
        });
        this.props.history.goBack();
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleArrayTextChange = i => e => {
        const newArray = this.state[e.target.name].map((responsibility, j) =>
        i !== j ? responsibility : { ...responsibility, text: e.target.value});

        this.setState({ [e.target.name]: newArray });
    };

    handleAddInput = e => {
        this.setState({
            [e.target.name]: this.state[e.target.name].concat([{ text: '' }])
        });
    };

    handleRemoveFromArray = i => e => {
        this.setState({
            [e.target.name]: this.state[e.target.name].filter((s, j) => i !== j)
        });
    };

    handleBackClick = e => {
        e.preventDefault();
        this.props.history.goBack();
    }

    render() {
        const editing = this.props.location.pathname.split('/').pop() === 'edit';
        const buttonText = editing ? Content.forms.post.edit.buttonText : Content.forms.post.create.buttonText;
        let header = editing ? Content.forms.post.edit.title : Content.forms.post.create.title;
        let subheader = editing ? Content.forms.post.edit.note : Content.forms.post.create.note;
        return(
            <div className='form'>
                <Header header={header} history={this.props.history} />
                <div className='hr' />
                    <form onSubmit={this.handleNewPost} >
                        <Card type='form'>
                            <p>{subheader}</p>

                            {/* Company Name */}
                            {/* <label htmlFor='company'>Company/Organization:</label>
                            <input id='company' name='company' onChange={this.handleChange} value={this.state.company || ''} type='text' required /> */}
                            {/* Link and Imaage */}
                            {/* <div className='form-section mt-2'>
                                <div className='form-section-item'>
                                    <label htmlFor='link'>Website Link:</label>
                                    <input id='link' name='link' onChange={this.handleChange} value={this.state.link || ''} type='text' required />
                                </div>
                                <div className='form-section-item'>
                                    <label htmlFor='image'>Image URL:</label>
                                    <input id='image' name='image' onChange={this.handleChange} value={this.state.image || ''} type='text' required />
                                </div>
                            </div> */}
                            {/* Company Description */}
                            {/* <label htmlFor='company_description'>Company Description:</label>
                            <textarea id='company_description' name='company_description' onChange={this.handleChange} value={this.state.company_description || ''} type='text' required /> */}

                            {/* Position Title */}
                            <label htmlFor='position'>Position:</label>
                            <input id='position' name='position' onChange={this.handleChange} value={this.state.position || ''} type='text' required />

                            {/* Location & Industry */}
                            <div className='form-section mt-2'>
                                <div className='form-section-item'>
                                    <label htmlFor='location'>Location:</label>
                                    <input id='location' name='location' onChange={this.handleChange} value={this.state.location || ''} type='text' required />
                                </div>
                                <div className='form-section-item'>
                                    <label htmlFor='post_industry'>Post Industry:</label>
                                    <select id='post_industry' name='post_industry' onChange={this.handleChange} value={this.state.post_industry || ''} required >
                                        <option disabled value=''>--Please choose an option--</option>
                                        {Object.values(IndustryValues).map((post_industry, i) => (<option key={i} value={post_industry || ''}>{post_industry}</option>))}
                                    </select>
                                </div>
                            </div>

                            {/* Dates of Employment */}
                            <div className='form-section mt-2'>
                                <div className='form-section-item'>
                                    <label htmlFor='start_date'>Start Date:</label>
                                    <input id='start_date' name='start_date' onChange={this.handleChange} value={this.state.start_date || ''} type='date' required />
                                </div>
                                <div className='form-section-item'>
                                    <label htmlFor='end_date'>End Date:</label>
                                    <input id='end_date' name='end_date' onChange={this.handleChange} value={this.state.end_date || ''} type='date' required />
                                </div>
                            </div>

                            {/* Position Description */}
                            <label htmlFor='position_description'>Position Description:</label>
                            <textarea id='position_description' name='position_description' onChange={this.handleChange} value={this.state.position_description || ''} type='text' required />

                            {/* Responsibilities */}
                            <label htmlFor='responsibilities'>Responsibilities:</label>
                            {this.state.responsibilities.map((responsibility, i) => (
                                <div key={i} className='array-box'>
                                    <input name='responsibilities' type='text' placeholder='Responsibility' value={responsibility.text || ''} onChange={this.handleArrayTextChange(i)} />
                                    <button name='responsibilities' type='button' onClick={this.handleRemoveFromArray(i)}>x</button>
                                </div>
                            ))}
                            <button className='add-to-array-btn add-btn' name='responsibilities' type='button' onClick={this.handleAddInput} >Add Responsibility</button>

                            {/* Responsibilities */}
                            <label htmlFor='requirements'>Requirements:</label>
                            {this.state.requirements.map((requirements, i) => (
                                <div key={i} className='array-box'>
                                    <input name='requirements' type='text' placeholder='Requirement' value={requirements.text || ''} onChange={this.handleArrayTextChange(i)} />
                                    <button name='requirements' type='button' onClick={this.handleRemoveFromArray(i)}>x</button>
                                </div>
                            ))}
                            <button className='add-to-array-btn add-btn' name='requirements' type='button' onClick={this.handleAddInput} >Add Requirement</button>

                            {/* Responsibilities */}
                            <label htmlFor='compensation'>Compensation:</label>
                            {this.state.compensation.map((compensation, i) => (
                                <div key={i} className='array-box'>
                                    <input name='compensation' type='text' placeholder='Compensation' value={compensation.text || ''} onChange={this.handleArrayTextChange(i)} />
                                    <button name='compensation' type='button' onClick={this.handleRemoveFromArray(i)}>x</button>
                                </div>
                            ))}
                            <button className='add-to-array-btn add-btn' name='compensation' type='button' onClick={this.handleAddInput} >Add Compensation</button>

                            {/* Submit */}
                            <button className='lumaki-btn ' type='submit'>{buttonText}</button>
                        </Card>
                    </form>
                </div>
        )
    }
}

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1) || '01',
        day = '' + d.getDate() || '02',
        year = d.getFullYear() || '2000';

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps, { postNewPost, getPost, updatePost })(PostForm);

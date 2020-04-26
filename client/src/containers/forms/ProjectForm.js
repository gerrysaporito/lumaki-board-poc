import React, { Component } from 'react';
import { connect } from 'react-redux';
import { ERROR } from '../../store/actionTypes';

import { postNewProject, updateProject, getProject } from '../../store/actions/projects';
import Content from '../../common/Content';
import './css/Form.css';

class ProjectForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            description: '',
        };
    };

    componentDidMount() {
        if(this.props.location.pathname.split('/').pop() === 'edit') {
            const user_id = this.props.match.params.user_id;
            const project_id = this.props.match.params.project_id;
            this.props.getProject(user_id, project_id)
            .then(project => this.setState({
                ...project,
            }))
            .catch(() => {});
        }
    }

    handleNewProject = e => {
        e.preventDefault();
        const project_id = this.props.match.params.project_id;
        if (this.props.location.pathname.split('/').pop() === 'edit') {
            this.props.updateProject({...this.state}, project_id);
        } else {
            this.props.postNewProject({...this.state});
        }
        this.setState({
            description: '',
        });
        this.props.history.goBack();
    };

    handleChange = e => {
        this.setState({
            [e.target.name]: e.target.value
        })
    }

    handleBackClick = e => {
        e.preventDefault();
        this.props.history.goBack();
    }

    render() {
        const buttonText = this.props.location.pathname.split('/').pop() === 'edit' ?
            this.props.Content.forms.project.buttonText.edit : this.props.Content.forms.project.buttonText.create;
        return(
            <div className='form'>
                <div>
                    <form onSubmit={this.handleNewProject} >
                        <p>{this.props.Content.forms.project.note}</p>
                        <h3>{this.props.Content.forms.project.title}</h3>
                        {this.props.alerts === ERROR && this.props.alerts.message && (
                            <div className='alert alert-danger'>
                                {this.props.alerts.message}
                            </div>
                        )}
                        <label htmlFor='description'>Description:</label>
                        <textarea id='description' name='description' onChange={this.handleChange} value={this.state.description} required />
                        <button className='btn lumaki-btn btn-md mt-3' type='submit'>{buttonText}</button>
                    </form>
                    <button onClick={this.handleBackClick} className='return'>Go back</button>
                </div>
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        alerts: state.alerts,
        Content: Content,
    }
}

export default connect(mapStateToProps, { postNewProject, updateProject, getProject })(ProjectForm);

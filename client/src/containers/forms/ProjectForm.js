import React, { Component } from 'react';
import { connect } from 'react-redux';

import { postNewProject, updateProject, getProject } from '../../store/actions/projects';
import { Content } from '../../common/Content';
import './css/Form.css';
import Card from '../../components/general/Card';

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
            Content.forms.project.buttonText.edit : Content.forms.project.buttonText.create;
        return(
            <Card type='form inline'>
                <form className='form' onSubmit={this.handleNewProject} >
                    <p className='subheader'>{Content.forms.project.title}</p>
                    <p>{Content.forms.project.note}</p>
                    <label htmlFor='description'>Description:</label>
                    <textarea id='description' name='description' onChange={this.handleChange} value={this.state.description || ''} required />
                    <button className='lumaki-btn ' type='submit'>{buttonText}</button>
                </form>
                <button onClick={this.handleBackClick} className='return'>Go back</button>
            </Card>
        )
    }
}

function mapStateToProps(state) {
    return {
        Content: Content,
    }
}

export default connect(mapStateToProps, { postNewProject, updateProject, getProject })(ProjectForm);

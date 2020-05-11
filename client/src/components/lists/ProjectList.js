import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchProjects, removeProject } from '../../store/actions/projects';

import ProjectItem from '../../components/items/ProjectItem';
import './css/ProjectList.css';

class ProjectList extends Component {
    componentDidMount() {
        this.props.fetchProjects(this.props.currentUser.user._id);
    }

    render() {
        const {projects, removeProject, currentUser} = this.props;
        let projectList = projects.map(m => (
            <ProjectItem
                key={m._id}
                {...m}
                removeProject={removeProject.bind(this, m.user, m._id)}
                isCorrectUser={currentUser.user._id === m.user}
                currentUser={currentUser}
            />
        ));
        return(
            <div className='project-list'>
                {projectList}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {};
}

export default connect(mapStateToProps, { fetchProjects, removeProject })(ProjectList);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExperiences, removeExperience } from '../store/actions/experiences';

import ExperienceListItem from '../components/items/ExperienceListItem';
import './css/ExperienceList.css';

class ExperienceList extends Component {
    componentDidMount() {
        this.props.fetchExperiences(this.props.currentUser);
    }

    render() {
        const {experiences, removeExperience, currentUser} = this.props;
        let experienceList = experiences.map(m => (
            <ExperienceListItem
                key={m._id}
                {...m}
                removeExperience={removeExperience.bind(this, m.user, m._id)}
                isCorrectUser={currentUser === m.user}
                currentUser={currentUser}
            />
        ));
        return(
            <div className='experience-list'>
                {experienceList}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        experiences: state.experiences,
        currentUser: state.currentUser.user.id,
    };
}

export default connect(mapStateToProps, { fetchExperiences, removeExperience })(ExperienceList);

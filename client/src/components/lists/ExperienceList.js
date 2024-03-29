import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExperiences, removeExperience } from '../../store/actions/experiences';

import ExperienceItem from '../../components/items/ExperienceItem';
import './css/ExperienceList.css';

class ExperienceList extends Component {
    componentDidMount() {
        this.props.fetchExperiences(this.props.currentUser.user._id);
    }

    render() {
        const {experiences, removeExperience, currentUser} = this.props;

        let experienceList = experiences.map(m => (
            <ExperienceItem
                key={m._id}
                {...m}
                removeExperience={removeExperience.bind(this, m.user, m._id)}
                isCorrectUser={currentUser.user._id === m.user}
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
    return {};
}

export default connect(mapStateToProps, { fetchExperiences, removeExperience })(ExperienceList);

import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchExperiences, removeExperience } from '../store/actions/experiences';

import ExperienceListItem from '../components/ExperienceListItem';

class ExperiencesList extends Component {
    componentDidMount() {
        this.props.fetchMessages();
    }

    render() {
        const {experiences, removeExperience, currentUser} = this.props;
        let experienceList = experiences.map(m => (
            <ExperienceListItem
                key={m._id}
                date={m.createAt}
                text={m.text}
                username={m.user.username}
                profileImageUrl={m.user.profileImageUrl}
                removeMessage={removeExperience.bind(this, m.user._id, m._id)}
                isCorrectUser={currentUser === m.user._id}
            />
        ));
        return(
            <div className='row col-sm-8'>
                <div className='offset-1 col-sm-10'>
                    <ul className='list-group' id='experiences'>
                        {experienceList}
                    </ul>
                </div>
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

export default connect(mapStateToProps, { fetchExperiences, removeExperience })(ExperiencesList);

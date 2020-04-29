import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSkills, removeSkill } from '../../store/actions/skills';

import SkillListItem from '../../components/items/SkillListItem';
import './css/SkillList.css';

class SkillList extends Component {
    componentDidMount() {
        this.props.fetchSkills(this.props.currentUser.user._id);
    }

    render() {
        const {skills, removeSkill, currentUser} = this.props;
        let skillList = skills.map(m => (
            <SkillListItem
                key={m._id}
                {...m}
                removeSkill={removeSkill.bind(this, m.user, m._id)}
                isCorrectUser={currentUser.user._id === m.user}
                currentUser={currentUser}
            />
        ));
        return(
            <div className='skill-list'>
                {skillList}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        skills: state.skills,
        currentUser: state.currentUser,
    };
}

export default connect(mapStateToProps, { fetchSkills, removeSkill })(SkillList);

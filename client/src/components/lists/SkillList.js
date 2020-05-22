import React, { Component } from 'react';
import { connect } from 'react-redux';
import { fetchSkills, removeSkill } from '../../store/actions/skills';

import SkillItem from '../../components/items/SkillItem';
import './css/SkillList.css';

class SkillList extends Component {
    componentDidMount() {
        this.props.fetchSkills(this.props.currentUser.user._id);
    }

    render() {
        const {skills, removeSkill, currentUser} = this.props;
        console.log(skills)
        let skillList = skills.map(m => (
            <SkillItem
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
    return {};
}

export default connect(mapStateToProps, { fetchSkills, removeSkill })(SkillList);

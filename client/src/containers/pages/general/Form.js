import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Forms } from '../../../common/Definitions';
import { Content } from '../../../common/Content';
import Header from '../../../components/general/Header';
import ExperienceForm from '../../forms/ExperienceForm';
import ProjectForm from '../../forms/ProjectForm';
import PostForm from '../../forms/PostForm';
import SkillForm from '../../forms/SkillForm';

class Form extends Component {
    render() {
        const {formType, location, history} = this.props;
        const editing = location.pathname.split('/').pop() === 'edit';
        const buttonText = editing ? Content.forms[formType].edit.buttonText : Content.forms[formType].create.buttonText;
        let header = editing ? Content.forms[formType].edit.title : Content.forms[formType].create.title;
        let subheader = editing ? Content.forms[formType].edit.note : Content.forms[formType].create.note;

        let props = {
            subheader: subheader,
            buttonText: buttonText,
        };

        let form = '';
        switch(formType) {
            case Forms.experience: {
                form = <ExperienceForm {...props} {...this.props} />
                break;
            }
            case Forms.project: {
                form = <ProjectForm {...props} {...this.props} />
                break;
            }
            case Forms.skill: {
                form = <SkillForm {...props} {...this.props} />
                break;
            }
            case Forms.post: {
                form = <PostForm {...props} {...this.props} />
                break;
            }
            default: {
                form = '';
                break;
            }
        };

        return(
            <div className='form' id='input-form'>
                <Header header={header} history={this.props.history} />
                <div className='hr' />
                {form}
            </div>
        )
    }
}

function mapStateToProps(state) {
    return {
        currentUser: state.currentUser,
    }
}

export default connect(mapStateToProps, {})(Form);

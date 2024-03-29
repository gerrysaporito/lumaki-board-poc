import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Routes } from '../common/Routes';
import { Roles } from '../common/Definitions';

export default function withAdminAuth(ComponentToBeRendered) {
    class Authenticate extends Component {
        componentDidMount(){
            if(!this.props.isAuthenticated) {
                this.props.history.push(Routes.login.url);
            } else if(this.props.role !== Roles.admin && this.props.role !== Roles.superadmin) {
                this.props.history.push(Routes.home.url);
            }
        }

        componentDidUpdate(nextProps) {
            if(!nextProps.isAuthenticated) {
                this.props.history.push(Routes.login.url);
            } else if(this.props.role !== Roles.admin && this.props.role !== Roles.superadmin) {
                this.props.history.push(Routes.home.url);
            }
        }

        render() {
            return <ComponentToBeRendered {...this.props}/>;
        }
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.currentUser.isAuthenticated,
            role: state.currentUser.user.role,
        }
    }

    return connect(mapStateToProps)(Authenticate)
}

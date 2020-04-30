import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Roles } from '../common/Definitions';

export default function withSuperAdminAuth(ComponentToBeRendered) {
    class Authenticate extends Component {
        componentDidMount(){
            if(!this.props.isAuthenticated) {
                this.props.history.push('/login')
            } else if(this.props.role !== Roles.superadmin) {
                this.props.history.push('/')
            }
        }

        componentDidUpdate(nextProps) {
            if(!nextProps.isAuthenticated) {
                this.props.history.push('/login')
            } else if(this.props.role !== Roles.superadmin) {
                this.props.history.push('/')
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

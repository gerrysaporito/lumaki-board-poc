import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Roles } from '../common/Definitions';

export default function withAdminAuth(ComponentToBeRendered) {
    class Authenticate extends Component {
        componentDidMount(){
            if(!this.props.isAuthenticated) {
                this.props.history.push('/login')
            }
            // if(this.props.role !== this.props.Roles.admin || this.props.role !== this.props.Roles.superadmin) {
            //     console.log(this.props.role !== this.props.Roles.admin || this.props.role !== this.props.Roles.superadmin)
            //     this.props.history.push('/')
            // }
        }

        componentDidUpdate(nextProps) {
            if(!nextProps.isAuthenticated) {
                this.props.history.push('/login')
            }
            // if(this.props.role !== this.props.Roles.admin || this.props.role !== this.props.Roles.superadmin) {
            //     console.log(this.props.role !== this.props.Roles.admin || this.props.role !== this.props.Roles.superadmin)
            //     this.props.history.push('/')
            // }

        }

        render() {
            return <ComponentToBeRendered {...this.props}/>;
        }
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.currentUser.isAuthenticated,
            // role: state.currentUser.user.role,
            // Roles: Roles,
        }
    }

    return connect(mapStateToProps)(Authenticate)
}

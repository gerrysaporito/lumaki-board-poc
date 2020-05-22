import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Routes } from '../common/Routes';

export default function withAuth(ComponentToBeRendered, isAllowed, Content={}) {
    class Authenticate extends Component {
        componentDidMount(){
            if(!this.props.isAuthenticated) {
                this.props.history.push(Routes.login.url);
            } else if (!isAllowed) {
                this.props.history.push(Routes.home.url);
            }
        }

        componentDidUpdate(nextProps) {
            if(!nextProps.isAuthenticated) {
                this.props.history.push(Routes.login.url);
            } else if (!isAllowed) {
                this.props.history.push(Routes.home.url);
            }
        }

        render() {
            return <ComponentToBeRendered {...this.props} {...Content} />;
        }
    }

    function mapStateToProps(state) {
        return {
            ...state,
            isAuthenticated: state.currentUser.isAuthenticated,
        }
    }

    return connect(mapStateToProps)(Authenticate)
}

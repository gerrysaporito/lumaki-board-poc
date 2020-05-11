import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Routes } from '../common/Routes';

export default function withoutAuth(ComponentToBeRendered, Content) {
    class Authenticate extends Component {
        componentDidMount(){
            if(this.props.currentUser.isAuthenticated) {
                this.props.history.push(Routes.home.url);
            }
        }

        componentDidUpdate(nextProps) {
            if(nextProps.currentUser.isAuthenticated) {
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
        }
    }

    return connect(mapStateToProps)(Authenticate)
}

import React, { Component } from 'react';
import { connect } from 'react-redux';

import { Routes } from '../common/Routes';

export default function withoutAuth(ComponentToBeRendered, Contnet) {
    class Authenticate extends Component {
        componentDidMount(){
            if(this.props.isAuthenticated) {
                this.props.history.push(Routes.home.url);
            }
        }

        componentDidUpdate(nextProps) {
            if(nextProps.isAuthenticated) {
                this.props.history.push(Routes.home.url);
            }
        }

        render() {
            return <ComponentToBeRendered {...this.props} {...Contnet} />;
        }
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.currentUser.isAuthenticated,
        }
    }

    return connect(mapStateToProps)(Authenticate)
}

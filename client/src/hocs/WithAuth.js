import React, { Component } from 'react';
import { connect } from 'react-redux';

export default function withAuth(ComponentToBeRendered, isAllowed) {
    class Authenticate extends Component {
        componentDidMount(){
            if(!this.props.isAuthenticated) {
                this.props.history.push('/login')
            } else if (!isAllowed) {
                this.props.history.push('/');
            }
        }

        componentDidUpdate(nextProps) {
            if(!nextProps.isAuthenticated) {
                this.props.history.push('/login')
            } else if (!isAllowed) {
                this.props.history.push('/');
            }
        }

        render() {
            return <ComponentToBeRendered {...this.props}/>;
        }
    }

    function mapStateToProps(state) {
        return {
            isAuthenticated: state.currentUser.isAuthenticated,
        }
    }

    return connect(mapStateToProps)(Authenticate)
}

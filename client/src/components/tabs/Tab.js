import React, { Component } from 'react';

class Tab extends Component {
    handleClick = () => {
        const { label, onClick } = this.props;
        onClick(label);
    }

    render() {
        const {activeTab, label} = this.props;
        let className = 'tab-list-item';
        if (activeTab === label) {
            className += ' tab-list-active';
        }

        return (
            <li className={className} onClick={this.handleClick} >
                {label}
            </li>
        );
    }
}

export default Tab;

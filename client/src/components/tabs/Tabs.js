import React, { Component } from 'react';

import Tab from './Tab';
import './css/Tabs.css';

class Tabs extends Component {
    constructor(props) {
        super(props);

        this.state = {
            activeTab: this.props.children[0].props.label,
        };
    }

    onClickTabItem = (tab) => {
        this.setState({ activeTab: tab });
    }

    render() {
        const {children} = this.props;
        const {activeTab} = this.state;

        let tabs = children.map((child) => {
            const { label } = child.props;
            return (
                <Tab activeTab={activeTab} key={label} label={label} onClick={this.onClickTabItem} />
            );
        });

        let content = children.map((child) => {
            if (child.props.label !== activeTab) return undefined;
            return child.props.children;
        });

        return (
            <div className="tabs">
                <ul className="tab-list">
                    {tabs}
                </ul>
                <div className="tab-content">
                    {content}
                </div>
            </div>
        );
    }
}

export default Tabs;

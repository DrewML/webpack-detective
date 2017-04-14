// @flow
import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router';

const titleStyle = {
    background: 'rgb(0, 188, 212)',
    height: '64px',
    lineHeight: '64px',
    fontSize: '24px',
    fontWeight: 400,
    color: 'rgb(255, 255, 255)',
    textAlign: 'center'
};

export default class SideMenu extends Component {
    props: {
        close: Function;
    };

    closeAndRoute = (route: string) => () => {
        this.props.close();
        browserHistory.push(route);
    };

    render() {
        return (
            <section>
                <Drawer
                    docked={false}
                    width={300}
                    open={true}
                    disableSwipeToOpen={true}
                    onRequestChange={this.props.close}
                >
                    <div style={titleStyle}>
                        webpack detective
                    </div>
                    <MenuItem onTouchTap={this.closeAndRoute('/drilldown')}>
                        Module Drilldown
                    </MenuItem>
                    <MenuItem onTouchTap={this.closeAndRoute('/graphs')}>
                        Graphs
                    </MenuItem>
                    <MenuItem onTouchTap={this.closeAndRoute('/timing')}>
                        Timing
                    </MenuItem>
                </Drawer>
            </section>
        );
    }
}

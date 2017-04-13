// @flow
import React, { Component } from 'react';
import Drawer from 'material-ui/Drawer';
import MenuItem from 'material-ui/MenuItem';
import { browserHistory } from 'react-router';

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

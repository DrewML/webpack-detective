// @flow
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';
import SideMenu from '../SideMenu';
import { Link } from 'react-router';

export default class Header extends Component {
    state: { drawerOpen: bool } = {
        drawerOpen: false
    };

    openDrawer = () => this.setState({ drawerOpen: true });

    closeDrawer = () => this.setState({ drawerOpen: false });

    render() {
        return (
            <AppBar
                title='webpack detective'
                iconElementLeft={
                    <IconButton onClick={this.openDrawer}>
                        <MenuIcon />
                    </IconButton>
                }
                iconElementRight={
                    <FlatButton
                        label='Upload Stats'
                        icon={<UploadIcon />}
                        containerElement={<Link to='/upload' />}
                    />
                }
            >
                {this.state.drawerOpen &&
                    <SideMenu close={this.closeDrawer} />
                }
            </AppBar>
        );
    }
}

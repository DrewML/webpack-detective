// @flow
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';
import SideMenu from '../SideMenu';
import { uploadModalOpen } from '../../reducers/ui';
import { connect } from 'react-redux';

class Header extends Component {
    props: {|
        onUploadFile: Function;
    |};

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
                        onTouchTap={this.props.onUploadFile}
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

export default connect(null, dispatch => ({
    onUploadFile: () => dispatch(uploadModalOpen(true))
}))(Header);

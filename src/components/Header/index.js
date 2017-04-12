// @flow
import React, { Component } from 'react';
import AppBar from 'material-ui/AppBar';
import IconButton from 'material-ui/IconButton';
import FlatButton from 'material-ui/FlatButton';
import MenuIcon from 'material-ui/svg-icons/navigation/menu';
import UploadIcon from 'material-ui/svg-icons/file/file-upload';
import { Link } from 'react-router';

export default class Header extends Component {
    render() {
        return (
            <AppBar
                title='webpack detective'
                iconElementLeft={
                    <IconButton onClick={console.log}>
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
            />
        );
    }
}

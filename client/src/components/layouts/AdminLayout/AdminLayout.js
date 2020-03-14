import React, {Fragment, useState} from 'react';
import {withStyles} from '@material-ui/core/styles';
import classnames from 'classnames';
import PropTypes from 'prop-types';
import {Drawer} from '@material-ui/core';
//import components
import Footer from "./components/Footer/Footer";
import Topbar from "./components/Topbar/Topbar";
import Sidebar from "./components/Sidebar/Sidebar";
// Component styles
import styles from './styles';

const AdminLayout = (props) => {
    const [isOpen, setOpen] = useState(false);
    const {title, children, classes} = props;

    const handleToggleOpen = () => {
        setOpen(!isOpen);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <Fragment>
            <Topbar
                title={title}
                ToolbarClasses={classes.topbar}
                isSidebarOpen={isOpen}
                onToggleSidebar={handleToggleOpen}
            />
            <Drawer
                anchor="left"
                classes={{paper: classes.drawerPaper}}
                open={isOpen}
                onClose={handleClose}
                variant="persistent">
                <Sidebar className={classes.sidebar}/>
            </Drawer>
            <main
                className={classnames({
                    [classes.contentShift]: isOpen,
                    [classes.content]: true
                })}>
                {children}
                <Footer/>
            </main>
        </Fragment>
    );
};

AdminLayout.defaultProps = {
    isSidebarOpen: false
};
AdminLayout.propTypes = {
    children: PropTypes.node,
    isSidebarOpen: PropTypes.bool,
    title: PropTypes.string
};

export default withStyles(styles)(AdminLayout);
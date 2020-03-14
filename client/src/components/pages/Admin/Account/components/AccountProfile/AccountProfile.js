import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import {Avatar, Typography, withStyles} from '@material-ui/core';
import Portlet from "../../../../../Portlet/Portlet";
import PortletContent from "../../../../../PortletContent/PortletContent";
// Component styles
import styles from "./styles";

const AccountProfile = (props) => {
    const {user, className, classes} = props;
    const rootClassName = classNames(classes.root, className);

    return (
        <Portlet className={rootClassName}>
            <PortletContent>
                <div className={classes.details}>
                    <div className={classes.info}>
                        <Typography variant="h2">{user.name}</Typography>
                        <Typography className={classes.emailText} variant="body1">
                            {user.email}
                        </Typography>
                        <Typography className={classes.dateText} variant="body1">
                            Join at : {moment(user.created).format('HH:mm a DD/MM/YYYY')}
                        </Typography>
                    </div>
                    <Avatar
                        className={classes.avatar}
                        src="https://lh6.googleusercontent.com/proxy/fuL4VSMO_6YAYw2xxrOzNH1DziuxtWnxsdTjG2hpcR1LU_wktH3PWbW30CTfARSk3c1L1jQ2URCh-PSoeQSBFmRtOB-9jiFvRxR0L7XCRx1rERegCVvROpnuNWnQEKRPDkO6f8K2S-fMZNB0YHZzA3SF55REJL8V2ZerBXFSnkjEG-AhcvM-OW5Lta4K5-p0JqvtngIYPgjLXH9KNnFlwgR5jSAkuIYZSf-kGovMlbD3xVeI"
                    />
                </div>
            </PortletContent>
        </Portlet>
    );
};

AccountProfile.propTypes = {
    className: PropTypes.string,
    user: PropTypes.object.isRequired
};

export default withStyles(styles)(AccountProfile);

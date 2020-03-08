import React from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import moment from 'moment';
import {Avatar, Typography} from '@material-ui/core';
import Portlet from "../../../../../Portlet/Portlet";
import PortletContent from "../../../../../PortletContent/PortletContent";

// Component styles
import useStyles from "./styles";

const AccountProfile = (props) => {
    const classes = useStyles();
    const {user, className} = props;
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
                        src='https://instagram.fhan2-4.fna.fbcdn.net/v/t51.2885-15/e35/p1080x1080/69371979_491930528051914_5261482825231877185_n.jpg?_nc_ht=instagram.fhan2-4.fna.fbcdn.net&_nc_cat=110&_nc_ohc=B8xQ_7G19-sAX_42KtC&oh=a5d0f371bf0b229b59bd7a8e572eba41&oe=5E948D53'
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

export default AccountProfile;

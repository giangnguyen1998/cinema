import React from 'react';
import { Divider, Typography, Link } from '@material-ui/core';
import useStyles from './styles';

const Footer = () => {
    const classes = useStyles();
    return (
        <div className={classes.root}>
            <Divider />
            <Typography className={classes.copyright} variant="body1">
                &copy; FIT PM1
            </Typography>
            <Typography variant="caption">
                Crafted with love |{' '}
                <Link href="http://georgesimos.com/" target="_blank" rel="noopener">
                    Group PM1
                </Link>
            </Typography>
        </div>
    );
};

export default Footer;
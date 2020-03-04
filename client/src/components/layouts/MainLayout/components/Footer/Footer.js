import React from 'react';
import { Divider, Typography, Link } from '@material-ui/core';
import styles from './styles';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(styles);

export default function Footer() {
    const classes = useStyles();
    return (
        <div className={classes.root} >
            <Divider style={{backgroundColor:"#fff"}} />
            <Typography className={classes.source} variant="body1">
                &copy; National University Of Civil Engineering
            </Typography>
            <Typography variant="caption" >
                Crafted with love |{' '}
                <Link href="http://daotao.nuce.edu.vn/" target="_blank" rel="noopener">
                    NUCE
                </Link>
            </Typography>
        </div>
    );
}
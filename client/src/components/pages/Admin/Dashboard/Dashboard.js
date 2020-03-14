import React, {Component} from 'react';
import {withStyles, Grid} from '@material-ui/core';

const styles = theme => ({
    root: {
        textAlign: 'center',
        padding: theme.spacing(4)
    }
});

class Dashboard extends Component {
    render() {
        const {classes} = this.props;

        return (
            <div className={classes.root}>
                <Grid container spacing={4}>

                </Grid>
            </div>
        );
    }
}

export default withStyles(styles)(Dashboard);
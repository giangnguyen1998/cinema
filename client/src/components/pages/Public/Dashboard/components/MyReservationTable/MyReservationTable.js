import React, {useState} from 'react';
import PropTypes from 'prop-types';
import classNames from 'classnames';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TablePagination
} from '@material-ui/core';

import Portlet from "../../../../../Portlet/Portlet";
import PortletContent from "../../../../../PortletContent/PortletContent";
import useStyles from "./styles";

const ReservationsTable = (props) => {
    const classes = useStyles();

    const [paging, setPaging] = useState({
        rowsPerPage: 10,
        page: 0
    });

    const handleChangePage = (e, page) => {
        setPaging({page, ...paging});
    };

    const handleChangeRowsPerPage = e => {
        setPaging({...paging, rowsPerPage: e.target.value});
    };

    const onFindAttr = (id, list, attr) => {
        const item = list.find(item => item._id === id);
        return item ? item[attr] : `Not ${attr} Found`;
    };

    const {className, reservations = [], movies = [], cinemas = []} = props;
    const {rowsPerPage, page} = paging;
    const rootClassName = classNames(classes.root, className);

    return (
        <Portlet className={rootClassName}>
            <PortletContent noPadding>
                <Table>
                    <TableHead>
                        <TableRow>
                            <TableCell align="left">Movie</TableCell>
                            <TableCell align="left">Cinema</TableCell>
                            <TableCell align="left">Date</TableCell>
                            <TableCell align="left">Start At</TableCell>
                            <TableCell align="left">Ticket Price</TableCell>
                            <TableCell align="left">Total</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {reservations
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map(reservation => (
                                <TableRow
                                    className={classes.tableRow}
                                    hover
                                    key={reservation._id}>
                                    <TableCell className={classes.tableCell}>
                                        {onFindAttr(reservation.movieId, movies, 'title')}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {onFindAttr(reservation.cinemaId, cinemas, 'name')}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {new Date(reservation.date).toLocaleDateString()}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {reservation.startAt}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {reservation.ticketPrice}
                                    </TableCell>
                                    <TableCell className={classes.tableCell}>
                                        {reservation.total}
                                    </TableCell>
                                </TableRow>
                            ))}
                    </TableBody>
                </Table>
                <TablePagination
                    backIconButtonProps={{
                        'aria-label': 'Previous Page'
                    }}
                    component="div"
                    count={reservations.length}
                    nextIconButtonProps={{
                        'aria-label': 'Next Page'
                    }}
                    onChangePage={handleChangePage}
                    onChangeRowsPerPage={handleChangeRowsPerPage}
                    page={page}
                    rowsPerPage={rowsPerPage}
                    rowsPerPageOptions={[5, 10, 25]}
                />
            </PortletContent>
        </Portlet>
    );
};


ReservationsTable.propTypes = {
    className: PropTypes.string,
    onSelect: PropTypes.func,
    onShowDetails: PropTypes.func,
    reservations: PropTypes.array.isRequired,
    movies: PropTypes.array.isRequired,
    cinemas: PropTypes.array.isRequired
};

export default ReservationsTable;

import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchHomes } from '../../actions';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import Tooltip from '@material-ui/core/Tooltip';
import Button from '@material-ui/core/Button';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import { checkDate, getSorting, stableSort } from '../../js/functions';

const styles = theme => ({
    root: {
        width: '93%',
        marginTop: '45px',
        minHeight: 'calc(100vh - 225px)',
        boxShadow: 'none'
    },
    table: {
        minWidth: 200,
        fontFamily: 'Calibri',
        fontSize: '14px',
        color: '#676a6c',
        boxShadow: 'none'
    },
    tableWrapper: {
        overflowX: 'auto',
        backgroundColor: 'rgba(0,0,0,.05)',
        boxShadow: 'none',
        fontFamily: 'Calibri',
        fontSize: '14px',
        color: '#676a6c',
    },
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
    },
    pageContainer: {
        minHeight: 'calc(100vh - 175px)',
    },
    due: {
        width: '25px',
        height: '25px',
        borderRadius: '3px',
        display: 'inline-block',
        marginRight: '5px',
        fontWeight: 'bold',
        lineHeight: '25px',
        textAlign: 'center',
        color: '#fff',
        cursor: 'default'
    },
    dueAlmost: {
        backgroundColor: '#ffd54f',
    }, 
    dueExpired: {
        backgroundColor: '#e57373',
    },
    font: {
    //     fontSize: '12px',
    //     color: '#fff',
    //     fill: '#fff'
    },
    button: {
        margin: theme.spacing.unit,
        backgroundColor: '#2196f3',
        color: '#fff'
    },
    leftIcon: {
        marginRight: theme.spacing.unit,
    },
    rightIcon: {
        marginLeft: theme.spacing.unit,
    },
    iconSmall: {
        fontSize: 20,
    },
    row: {
        fontFamily: 'Calibri',
        fontSize: '14px',
        color: '#676a6c',
        height: '30px !important'
    },
});

class HomeList extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'home_name',
        selected: [],
        page: 0,
        rowsPerPage: 5,
        dueList: [],
    };

    componentDidMount() {
        this.props.fetchHomes();
    }

    almost_expired = (numDocs, classDue, classDueAlmost) => {
        if(numDocs != 0){
            return (
                <Tooltip
                    title="Almost Due"
                    placement={'bottom-start'}
                    enterDelay={300}
                >
                    <div className={`${classDue} ${classDueAlmost}`}>{numDocs}</div>
                </Tooltip>
            );
        } else {
            return ('')
        }
    }

    blank = (classDue) => {
        return (
            <div className={classDue}>.</div>
        );
    }

    expired = (numDocs, classDue, classDueExpired) => {
        if(numDocs != 0){
            return (
                <Tooltip
                    title="Overdue"
                    placement={'bottom-start'}
                    enterDelay={300}
                >
                    <div className={`${classDue} ${classDueExpired}`}>{numDocs}</div>
                </Tooltip>
            );  
        } else {
            return ('')
        }   
    }

    fillDueList = () => {
        let tempArray = [];
        this.props.homes.map((home) => {
            let countAlmostExpired = 0;
            let countExpired = 0;
            let tempObj = {};
            const homeValues = Object.entries(home);
            homeValues.map((homeValue) => {
                if(homeValue[0] === "home_id"){
                    tempObj[homeValue[0]] = homeValue[1];
                } else if(homeValue[0] === "home_name"){
                    tempObj[homeValue[0]] = homeValue[1];
                } else if(homeValue[0] === "primary_first_name"){
                    tempObj[homeValue[0]] = homeValue[1];
                } else if(isNaN(homeValue[1]) && homeValue[0]!="home_opened"){
                    const dt = new Date(homeValue[1]);
                    if(!isNaN(dt.getTime())){
                        const dateStatus = checkDate(homeValue[1]);
                        if(dateStatus == "almost-expired"){
                            countAlmostExpired++;
                        } else if(dateStatus == "expired"){
                            countExpired++;
                        }
                    }
                }
            });
            tempObj['almost_expired'] = countAlmostExpired;
            tempObj['expired'] = countExpired;
            tempArray.push(tempObj);
        });

        this.setState({ dueList: tempArray });
    };

    handleRequestSort = (event, property) => {
        const orderBy = property;
        let order = 'desc';

        if (this.state.orderBy === property && this.state.order === 'desc') {
            order = 'asc';
        }

        this.setState({ order, orderBy });
    };

    handleSelectAllClick = event => {
    if (event.target.checked) {
        this.setState({ selected: this.props.homes.map(home => home.home_id) });
        return;
    }
    this.setState({ selected: [] });
    };

    handleClick = (event, id) => {
        const { selected } = this.state;
        const selectedIndex = selected.indexOf(id);
        let newSelected = [];

        if (selectedIndex === -1) {
            newSelected = newSelected.concat(selected, id);
        } else if (selectedIndex === 0) {
            newSelected = newSelected.concat(selected.slice(1));
        } else if (selectedIndex === selected.length - 1) {
            newSelected = newSelected.concat(selected.slice(0, -1));
        } else if (selectedIndex > 0) {
            newSelected = newSelected.concat(
            selected.slice(0, selectedIndex),
            selected.slice(selectedIndex + 1),
            );
        }

        this.setState({ selected: newSelected });
    };

    handleChangePage = (event, page) => {
        this.setState({ page });
    };

    handleChangeRowsPerPage = event => {
        this.setState({ rowsPerPage: event.target.value });
    };

    isSelected = id => this.state.selected.indexOf(id) !== -1;

    render() {
        const { classes, homes } = this.props;
        const { dueList, order, orderBy, selected, rowsPerPage, page } = this.state;
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, homes.length - page * rowsPerPage);
        
        if(homes[0] && !dueList[0]){
            this.fillDueList();
        }
            
        if(dueList[0]){
            return (
                <div className ={`${classes.container} ${classes.pageContainer}`}>
                    <Paper className={classes.root}>
                        <EnhancedTableToolbar 
                            numSelected={selected.length} 
                            homes={homes} 
                            selected={selected}
                        />
                        <div className={classes.tableWrapper}>
                            <Table className={classes.table} aria-labelledby="tableTitle">
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={homes.length}
                            />
                            <TableBody className ={classes.table}>
                                {stableSort(dueList, getSorting(order, orderBy))
                                .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                                .map(n => {
                                    const isSelected = this.isSelected(n.home_id);
                                    return (
                                    <TableRow
                                        hover
                                        onClick={event => this.handleClick(event, n.home_id)}
                                        role="checkbox"
                                        aria-checked={isSelected}
                                        tabIndex={-1}
                                        key={n.home_id}
                                        selected={isSelected}
                                        className={classes.row}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox 
                                                checked={isSelected}   
                                                inputprops={{ classes: { root: classes.font, checked: classes.font } }}
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none">
                                            {n.home_name}
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none">
                                            {n.primary_first_name}
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none">
                                            {this.almost_expired(n.almost_expired, classes.due, classes.dueAlmost)}
                                            {(!this.almost_expired(n.almost_expired, classes.due, classes.dueAlmost) && this.expired(n.expired, classes.due, classes.dueExpired)) ? this.blank(classes.due) : ''}
                                            {this.expired(n.expired, classes.due, classes.dueExpired)}
                                            {(!this.almost_expired(n.almost_expired, classes.due, classes.dueAlmost) && !this.expired(n.expired, classes.due, classes.dueExpired)) ? 'Up to Date' : ''}
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none">
                                            {/* <IconButton component={Link} to={`/homes/edit/${n.home_id}`} aria-label="Edit">
                                                <Edit />
                                            </IconButton> */}
                                            <Button variant="contained" size="small" className={classes.button} component={Link} to={`/homes/edit/${n.home_id}`}>
                                                Edit
                                            </Button>
                                            {/* <Button variant="contained" size="small" className={classes.button} component={Link} to={`/homes/edit/${n.home_id}`}>
                                                Edit
                                            </Button> */}
                                        </TableCell>
                                    </TableRow>
                                    );
                                })}
                                {emptyRows > 0 && (
                                <TableRow style={{ height: 49 * emptyRows }}>
                                    <TableCell colSpan={6} />
                                </TableRow>
                                )}
                            </TableBody>
                            </Table>
                        </div>
                        <TablePagination
                            rowsPerPageOptions={[5, 10, 25]}
                            component="div"
                            count={homes.length}
                            rowsPerPage={rowsPerPage}
                            page={page}
                            backIconButtonProps={{
                            'aria-label': 'Previous Page',
                            }}
                            nextIconButtonProps={{
                            'aria-label': 'Next Page',
                            }}
                            onChangePage={this.handleChangePage}
                            onChangeRowsPerPage={this.handleChangeRowsPerPage}
                        />
                    </Paper>
                </div>
            );
        } else {
            return ('');
        } 
    }
}

const mapStateToProps = (state) => {
    return { homes: Object.values(state.homes)}; //Object.values turns it into an array so it's easier for us to loop through
};

HomeList.propTypes = {
    classes: PropTypes.object.isRequired,
};

const formWrapped = reduxForm({ 
    form: 'homeList', 
    touchOnBlur : false, 
})(HomeList);

export default connect(mapStateToProps, { fetchHomes })(withStyles(styles)(formWrapped));

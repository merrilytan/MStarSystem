import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchHomes } from '../../actions';
import { reduxForm } from 'redux-form';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import Tooltip from '@material-ui/core/Tooltip';
import EnhancedTableHead from './EnhancedTableHead';
import EnhancedTableToolbar from './EnhancedTableToolbar';
import { checkDate, getSorting, stableSort } from '../../js/functions';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        minWidth: '40px',
        boxShadow: 'none',
        height: '25px',
        fontSize: '13px',
        '&:hover': {
            color: '#fff'
        },
        '&:focus': {
            boxShadow: 'none'
        }
    },
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
    },
    due: {
        width: '25px',
        height: '25px',
        fontSize: '13px',
        borderRadius: '3px',
        display: 'inline-block',
        marginRight: '5px',
        lineHeight: '25px',
        textAlign: 'center',
        color: '#fff',
        cursor: 'default'
    },
    dueAlmost: {
        backgroundColor: '#ffc34d',
    }, 
    dueExpired: {
        backgroundColor: '#e57373',
    },
    pagination: {
        backgroundColor: '#fff',
        borderBottomLeftRadius: '3px',
        borderBottomRightRadius: '3px',
        color: '#676a6c'
    },
    root: {
        width: '93%',
        marginTop: '45px',
        minHeight: 'calc(100vh - 225px)',
    },
    tableBody: {
        backgroundColor: 'rgba(0,0,0,.02)',
    },
    tableCell: {
        color: '#676a6c',
    }
});

class HomeList extends React.Component {
    state = {
        order: 'asc',
        orderBy: 'home_name',
        selected: [],
        page: 0,
        rowsPerPage: 5,
    };

    componentDidMount() {
        this.props.fetchHomes();
    }

    
    renderDocStatus = (numDocs, commonClass, specificClass, status) => {
        if(numDocs === 0){
            return ('');
        } else if(status == 'almostExpired' || status == 'expired') {
            return (
                <Tooltip
                    title={status == 'almostExpired' ? "Almost Due" : "Overdue"}
                    placement={'bottom-start'}
                    enterDelay={300}
                >
                    <div className={`${commonClass} ${specificClass}`}>{numDocs}</div>
                </Tooltip>
            );
        } 
    } 

    //Table Pagination ------------------------------------------------------------------------
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
        const { order, orderBy, selected, rowsPerPage, page } = this.state;
        let dueList = [];
        const emptyRows = rowsPerPage - Math.min(rowsPerPage, homes.length - page * rowsPerPage);
    
        const fillDueList = () => {
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
            return tempArray;
        };
        
        if(homes[0]){
            dueList = fillDueList();
        }
            
        if(dueList[0]){
            return (
                <div className ={classes.container}>
                    <div className={classes.root}>
                        <EnhancedTableToolbar 
                            numSelected={selected.length} 
                            homes={homes} 
                            selected={selected}
                        />
                        <Table>
                            <EnhancedTableHead
                                numSelected={selected.length}
                                order={order}
                                orderBy={orderBy}
                                onSelectAllClick={this.handleSelectAllClick}
                                onRequestSort={this.handleRequestSort}
                                rowCount={homes.length}
                            />
                            <TableBody className ={classes.tableBody}>
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
                                        classes={{ root: classes.tableRow }}
                                    >
                                        <TableCell padding="checkbox">
                                            <Checkbox 
                                                checked={isSelected}   
                                            />
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none" className={classes.tableCell}>
                                            {n.home_name}
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none" className={classes.tableCell}>
                                            {n.primary_first_name}
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none" className={classes.tableCell}>
                                            {this.renderDocStatus(n.almost_expired, classes.due, classes.dueAlmost, 'almostExpired')}
                                            {(!this.renderDocStatus(n.almost_expired, classes.due, classes.dueAlmost, 'almostExpired') && this.renderDocStatus(n.expired, classes.due, classes.dueExpired, 'expired')) ? <div className={classes.due}>.</div> : ''}
                                            {this.renderDocStatus(n.expired, classes.due, classes.dueExpired, 'expired')}
                                            {(!this.renderDocStatus(n.almost_expired, classes.due, classes.dueAlmost, 'almostExpired') && !this.renderDocStatus(n.expired, classes.due, classes.dueExpired, 'expired')) ? 'Up to Date' : ''}
                                        </TableCell>
                                        <TableCell component="th" scope="row" padding="none" className={classes.tableCell}> 
                                            <Button variant="contained" color="primary" size="small" className={classes.button} component={Link} to={`/homes/edit/${n.home_id}`}>
                                                Edit
                                            </Button>
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
                            className={classes.pagination}
                        />
                    </div>
                </div>
            );
        } else {
            return '';
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

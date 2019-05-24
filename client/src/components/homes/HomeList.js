import React from 'react';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { fetchHomes } from '../../actions';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom'
import { withStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TablePagination from '@material-ui/core/TablePagination';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Paper from '@material-ui/core/Paper';
import Checkbox from '@material-ui/core/Checkbox';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
//import DeleteIcon from '@material-ui/icons/Delete';
import Button from '@material-ui/core/Button';
// import FilterListIcon from '@material-ui/icons/FilterList';
// import { lighten } from '@material-ui/core/styles/colorManipulator';
import PrintIcon from '@material-ui/icons/Print';
import * as jsPDF from 'jspdf';
// import Fab from '@material-ui/core/Fab';
// import Icon from '@material-ui/core/Icon';
//import SaveIcon from '@material-ui/icons/Save';


// let counter = 0;
// function createData(home_name, primary_first_name, due_docs, edit) {
//     counter += 1;
//     return { id: counter, home_name, primary_first_name, due_docs, edit};
// }

function desc(a, b, orderBy) {
    if (b[orderBy] < a[orderBy]) {
        return -1;
    }
    if (b[orderBy] > a[orderBy]) {
        return 1;
    }
    return 0;
}


function stableSort(array, cmp) {
    const stabilizedThis = array.map((el, index) => [el, index]);
    stabilizedThis.sort((a, b) => {
        const order = cmp(a[0], b[0]);
        if (order !== 0) return order;
        return a[1] - b[1];
    });
    return stabilizedThis.map(el => el[0]);
}

function getSorting(order, orderBy) {
    return order === 'desc' ? (a, b) => desc(a, b, orderBy) : (a, b) => -desc(a, b, orderBy);
}

function checkDate(input) {
    var currentDate = new Date();
    var inputDate = new Date(input);
    var diffMilliseconds = Math.abs(inputDate.getTime() - currentDate.getTime());
    var diffDays = Math.ceil(diffMilliseconds/86400000);

    if(currentDate > inputDate && diffDays > 1 ){
        return ("expired");
    } else if (diffDays <=30 ){
        return ("almost-expired");
    }
}

//-----------------------------------------------------------------------------------------------------------------------

const rows = [
  { id: 'home_name', numeric: false, disablePadding: true, label: 'Home Name' },
  { id: 'primary_first_name', numeric: false, disablePadding: true, label: 'Primary First Name' },
  { id: 'due_docs', numeric: false, disablePadding: true, label: 'Docs Due' },
  { id: 'edit', numeric: false, disablePadding: true},
];

const headerStyles = theme => ({
    row: {
        //backgroundColor: '#2196f3',
        // borderBottom: '3px solid #2196f3'
        backgroundColor: '#fff',
    }, 
    font: {
        fontSize: '14px',
        fontFamily: 'Calibri',
        color: '#676a6c',
        fontWeight: 'bold'
    }
});

class EnhancedTableHead extends React.Component {
    createSortHandler = property => event => {
        this.props.onRequestSort(event, property);
    };

    render() {
        const { classes, onSelectAllClick, order, orderBy, numSelected, rowCount } = this.props;

        return (
            <TableHead>
                <TableRow className = {classes.row}>
                    <TableCell padding="checkbox">
                    <Checkbox
                        indeterminate={numSelected > 0 && numSelected < rowCount}
                        checked={numSelected === rowCount}
                        onChange={onSelectAllClick}
                        InputProps={{ classes: { root: classes.font, checked: classes.font } }}
                    />
                    </TableCell>
                    {rows.map(
                    row => (
                        <TableCell
                        key={row.id}
                        align={row.numeric ? 'right' : 'left'}
                        padding={row.disablePadding ? 'none' : 'default'}
                        sortDirection={orderBy === row.id ? order : false}
                        className={classes.font}
                        >
                        <Tooltip
                            title="Sort"
                            placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                            enterDelay={300}
                        >
                            <TableSortLabel
                            active={orderBy === row.id}
                            direction={order}
                            onClick={this.createSortHandler(row.id)}
                            className={classes.font}
                            >
                            {row.label}
                            </TableSortLabel>
                        </Tooltip>
                        </TableCell>
                    ),
                    this,
                    )}
                </TableRow>
            </TableHead>
        );
    }
}

EnhancedTableHead.propTypes = {
    numSelected: PropTypes.number.isRequired,
    onRequestSort: PropTypes.func.isRequired,
    onSelectAllClick: PropTypes.func.isRequired,
    order: PropTypes.string.isRequired,
    orderBy: PropTypes.string.isRequired,
    rowCount: PropTypes.number.isRequired,
    classes: PropTypes.object.isRequired,
};

EnhancedTableHead = withStyles(headerStyles)(EnhancedTableHead);

//-----------------------------------------------------------------------------------------------------------------------

const toolbarStyles = theme => ({
    root: {
        paddingRight: theme.spacing.unit,
        //height: '0px',
        borderTopLeftRadius: '3px',
        borderTopRightRadius: '3px',
        borderTop: '2px solid #e7eaec',
        borderBottom: '1px solid #e7eaec'
    },
    // highlight:
    //     theme.palette.type === 'light'
    //         ? {
    //             color: theme.palette.secondary.main,
    //             backgroundColor: lighten(theme.palette.secondary.light, 0.85),
    //         }
    //         : {
    //             color: theme.palette.text.primary,
    //             backgroundColor: theme.palette.secondary.dark,
    //         },
    spacer: {
        flex: '1 1 100%',
    },
    actions: {
        color: theme.palette.text.secondary,
    },
    title: {
        flex: '0 0 auto',
    },
    header: {
        color: '#676a6c',
        flexGrow: 1,
        fontSize: '14px',
        fontWeight: 'bold',
    },
    font: {
        color: '#fff'
    }
});

class EnhancedTableToolbar extends React.Component {

    checkDate = (input) => {
        var currentDate = new Date();
        var inputDate = new Date(input);
        var diffMilliseconds = Math.abs(inputDate.getTime() - currentDate.getTime());
        var diffDays = Math.ceil(diffMilliseconds/86400000);
    
        if(currentDate > inputDate && diffDays > 1 ){
            return ("expired");
        } else if (diffDays <=30 ){
            return ("almost-expired");
        } else {
            return ('');
        }
    }

    printPDF = (homes, selected) => {
   
        const generateTable = (home) => {
            let result = [];
            const homeValues = Object.entries(home);
            let data = {};

            homeValues.forEach(homeValue => {
                if(homeValue[0] != 'home_id' && homeValue[0] != 'home_name'){
                    data[homeValue[0]] = homeValue[1];
                }
            });

            result.push(Object.assign({}, data));
            console.log('result', result);
            return result;
        };

        const createHeaders = (keys) => {
            var result = [];
            for (var i = 0; i < keys.length; i += 1) {
                result.push({
                'id' : keys[i],
                    'name': keys[i],
                    'prompt': keys[i],
                    'width': 65,
                    'align': 'center',
                    'padding': 0
                });
            }
            return result;
        }

        let tempArray = [];
        console.log('selected', selected);

        homes.forEach((home) => {
            let tempObj = {};
            const homeValues = Object.entries(home);
            homeValues.forEach((homeValue) => {
                if(homeValue[0] === "home_id"){
                    tempObj[homeValue[0]] = homeValue[1];
                } else if(homeValue[0] === "home_name"){
                    tempObj[homeValue[0]] = homeValue[1];
                } else if(isNaN(homeValue[1]) && homeValue[0]!="home_opened"){
                    const dt = new Date(homeValue[1]);
                    if(!isNaN(dt.getTime())){
                        const dateStatus = checkDate(homeValue[1]);
                        if(dateStatus == "almost-expired" || dateStatus == "expired"){
                            tempObj[homeValue[0]] = homeValue[1];
                        }
                    }
                }
            });
            tempArray.push(tempObj);
            console.log('tempArray', tempArray);
        });

        const orderedHomes = stableSort(tempArray, getSorting('asc', 'home_name'));
        console.log('orderedHomes', orderedHomes);
        
        const headers = createHeaders(["Document", "Expiry Date"]);
        const pdf = new jsPDF();

        orderedHomes.forEach(home => {
            pdf.text(10, 10, home.home_name);
            pdf.table(1, 1, generateTable(home), headers, { autoSize: true });
        });
    
        pdf.save();
    };


    render() {
        const { numSelected, classes, homes, selected } = this.props;
        console.log('homesssssssssssss', homes);

        return (
            <Toolbar 
                className={classNames(classes.root, {
                [classes.highlight]: numSelected > 0,
                })}
            >
                <div className={classes.title}>
                    {numSelected > 0 ? (
                        <Typography className={classes.font} variant="subtitle1">
                            {numSelected} selected
                        </Typography>
                    ) : (
                        <Typography variant="h6" id="tableTitle" className={classes.header}>
                            Open Homes
                        </Typography>
                    )}
                </div>
                <div className={classes.spacer} />
                <div className={classes.actions}>
                    {numSelected > 0 ? (
                        <Tooltip title="Print">
                        <IconButton aria-label="Print" onClick={() => this.printPDF(homes, selected)}>
                            <PrintIcon />
                        </IconButton>
                        </Tooltip>
                    ) : (
                        ""
                    )}
                </div>
            </Toolbar>
        );
    }
};

EnhancedTableToolbar.propTypes = {
    classes: PropTypes.object.isRequired,
    numSelected: PropTypes.number.isRequired,
};

EnhancedTableToolbar = withStyles(toolbarStyles)(EnhancedTableToolbar);

//-----------------------------------------------------------------------------------------------------------------------

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
        orderBy: 'primary_first_name',
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
        console.log('tempArray', tempArray);
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
        console.log('this.props', this.props);
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
                                                InputProps={{ classes: { root: classes.font, checked: classes.font } }}
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

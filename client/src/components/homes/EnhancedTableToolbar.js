import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AddIcon from '@material-ui/icons/AddCircle';
import IconButton from '@material-ui/core/IconButton';
import PrintIcon from '@material-ui/icons/Print';
import Toolbar from '@material-ui/core/Toolbar';
import Tooltip from '@material-ui/core/Tooltip';
import Typography from '@material-ui/core/Typography';
import printAllHomeDueDates from '../../js/pdfs/printAllHomeDueDates';

const toolbarStyles = theme => ({

    actionButtonContainer: {
        display: 'flex',
        color: theme.palette.text.secondary,
    },
    root: {
        paddingRight: theme.spacing.unit,
        borderTopLeftRadius: '3px',
        borderTopRightRadius: '3px',
        borderTop: '2px solid #e7eaec',
        borderBottom: '1px solid #e7eaec'
    },
    spacer: {
        flex: '1 1 100%',
    },
    tableHeader: {
       flex: '0 0 auto',
    },
    tableTitle: {
        color: '#1769aa', 
        fontWeight: 'bold'
    },       
});

class EnhancedTableToolbar extends React.Component {

    render() {
        const { numSelected, classes, homes, selected } = this.props;

        return (
            <Toolbar className={classes.root}>
                <div className={classes.tableHeader}>
                    {numSelected > 0 ? (
                        <Typography color="secondary" >
                            {numSelected} selected
                        </Typography>
                    ) : (
                        <Typography id="tableTitle" className={classes.tableTitle}>
                            Open Homes
                        </Typography>
                    )}
                </div>
                <div className={classes.spacer} />
                <div>
                    {numSelected > 0 ? (
                        <div className = {classes.actionButtonContainer}>
                            <Tooltip title="Create new home">
                                <IconButton aria-label="Add new home" component={Link} to="/homes/new">
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Print"> 
                                <IconButton aria-label="Print" onClick={() => printAllHomeDueDates(homes, selected)}>
                                    <PrintIcon />
                                </IconButton>
                            </Tooltip>
                        </div>
                    ) : (
                        <div className = {classes.actionButtonContainer}>
                            <Tooltip title="Add new home">
                                <IconButton aria-label="Add new home" component={Link} to="/homes/new">
                                    <AddIcon />
                                </IconButton>
                            </Tooltip>
                            <Tooltip title="Select home(s) to print">
                                <div>
                                    <IconButton disabled={true}>
                                        <PrintIcon />
                                    </IconButton>
                                </div>
                            </Tooltip>
                        </div>
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

export default withStyles(toolbarStyles)(EnhancedTableToolbar);
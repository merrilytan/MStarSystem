import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Checkbox from '@material-ui/core/Checkbox';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import TableSortLabel from '@material-ui/core/TableSortLabel';
import Tooltip from '@material-ui/core/Tooltip';

const rows = [
  { id: 'home_name', numeric: false, disablePadding: true, label: 'Home Name' },
  { id: 'primary_first_name', numeric: false, disablePadding: true, label: 'Primary First Name' },
  { id: 'due_docs', numeric: false, disablePadding: true, label: 'Docs Due' },
  { id: 'edit', numeric: false, disablePadding: true},
];

const headerStyles = theme => ({
    tableHead: {
        backgroundColor: '#fff',
        height: '0px !important',
    }, 
    tableHeadLabel: {
        fontWeight: 'bold',
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
                <TableRow className = {classes.tableHead}>
                    <TableCell padding="checkbox">
                        <Checkbox
                            indeterminate={numSelected > 0 && numSelected < rowCount}
                            checked={numSelected === rowCount}
                            onChange={onSelectAllClick}
                        />
                    </TableCell>
                    {rows.map(
                        row => (
                            <TableCell
                                key={row.id}
                                align={row.numeric ? 'right' : 'left'}
                                padding={row.disablePadding ? 'none' : 'default'}
                                sortDirection={orderBy === row.id ? order : false}
                            >
                                {row.id != 'due_docs' ? (
                                    <Tooltip
                                        title="Sort"
                                        placement={row.numeric ? 'bottom-end' : 'bottom-start'}
                                        enterDelay={300}
                                    >
                                        <TableSortLabel
                                            active={orderBy === row.id}
                                            direction={order}
                                            onClick={this.createSortHandler(row.id)}
                                            className={classes.tableHeadLabel}
                                        >
                                            {row.label}
                                        </TableSortLabel>
                                    </Tooltip>
                                ) : (
                                    <div className={classes.tableHeadLabel}>
                                        {row.label}
                                    </div>
                                )}
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

export default withStyles(headerStyles)(EnhancedTableHead);
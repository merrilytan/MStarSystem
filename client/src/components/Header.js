import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import { Link } from 'react-router-dom';

const styles = {
    root: {
      flexGrow: 1,
    },
    appBar: {
        backgroundColor: '#2196f3',
    },
    grow: {
      flexGrow: 1,
    },
    menuButton: {
      marginLeft: -12,
      marginRight: 20,
    },
};

const Header = (props) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar>
                    <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton>
                    <Typography component={Link} to="/" variant="h6" color="inherit" className={classes.grow}>
                        m*system
                    </Typography>
                    <Button component={Link} to="/" color="inherit">Homes List</Button>
                    <Button component={Link} to="/homes/new" color="inherit">Create Home</Button>
                </Toolbar>
            </AppBar>
        </div>
        // <div className="ui teal top menu inverted">
        //     <Link to="/" className="item">
        //         M*System
        //     </Link>
        //     <div className="right menu">
        //         <Link to="/" className="item">
        //             Homes List
        //         </Link>
        //         <Link to="/homes/new" className="item">
        //             New Home
        //         </Link>
        //     </div>
        // </div>
    );
};

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
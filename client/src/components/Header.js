import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';

const styles = {
    root: {
        flexGrow: 1,
    },
    appBar: {
        boxShadow: 'none',
        display: 'flex',
    },
    toolbar: {
        paddingLeft: '0px',
        flexGrow: 1,
        alignItems: 'stretch'
    },
    logoContainer: {
        backgroundColor: '#1769aa',
        maxHeight: '64px',
        paddingLeft: '40px',
        paddingRight: '40px',
        display: 'flex',
        alignItems: 'center',
    },
    logo: {
        fontWeight: '600',
        fontSize: '16px',
        border: '2px solid #fff',
        borderRadius: '5px',
        padding: '3px 3px',
        lineHeight: '18px',
        fontFamily: 'arial',
        '&:hover': {
            border: '2px solid #2196f3',
            color: '#2196f3'
        }
    },
    menuButton: {
        borderRight: '1px solid #42a5f5',
        borderRadius: 0,
        width: '90px',
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: '13px',
        lineHeight: '13px',
        padding: '0px 20px',
        '&:hover': {
            color: '#fff'
        }
    }
};

const Header = (props) => {
    const { classes } = props;
    return (
        <div className={classes.root}>
            <AppBar position="static" className={classes.appBar}>
                <Toolbar className={classes.toolbar}>
                    {/* <IconButton className={classes.menuButton} color="inherit" aria-label="Menu">
                        <MenuIcon />
                    </IconButton> */}
                    <div className={classes.logoContainer}>
                        <Typography component={Link} to="/" color="inherit" className={classes.logo}>
                            m*
                        </Typography>
                    </div>
                    <Button component={Link} to="/" color="inherit" className={classes.menuButton}>Homes List</Button>
                    <Button component={Link} to="/homes/new" color="inherit" className={classes.menuButton}>Create Home</Button>
                </Toolbar>
            </AppBar>
        </div>
    );
};

Header.propTypes = {
    classes: PropTypes.object.isRequired
};

export default withStyles(styles)(Header);
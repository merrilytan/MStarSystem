import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { createHome } from '../../actions';

const styles = theme => ({
    button: {
        boxShadow: 'none',
        marginTop: '20px',
        marginBottom: 0,
        '&:hover': {
            color: '#fff',
        },
        '&:focus': {
            boxShadow: 'none'
        }
    },
    flexContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    header: {
        paddingBottom: 15,
        textTransform: 'uppercase',
        color: '#2196f3',
        fontSize: '18px',
        flexGrow: 1,
        fontWeight: 'bold'
    },
    label: {
        zIndex: '1000',
        minWidth: '80px',
    },
    inputField: {
        marginBottom: 10,
    },
    pageContainer: {
        minHeight: 'calc(100vh - 64px)'
    },
    paper: {
        minWidth: 275,
        maxWidth: 325,
        padding: '30px 40px',
        textAlign: 'center',
    },
    success: {
        border: '1px solid #199a28',
        marginTop: '10px',
        padding: '8px 10px',
        borderRadius: '4px',
        color: '#199a28',
        fontWeight: 'bold',
        backgroundColor: '#e5f9e7',
    },
});

class HomeCreate extends React.Component {

    state = {};

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    renderSuccess(){
        if(this.state.success) {
            return (
                <div className={this.props.classes.success}>
                    { `${this.state.submittedValues.home_name} home created!`}
                    {/* <a href={`/homes/edit/${this.state.submittedValues.home_id}`}>{this.state.submittedValues.home_name}</a> */}
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta, className, required }) => {
        console.log('meta.error', meta);
        return (
            <TextField
                id="outlined-helperText"
                label={label}
                className={className}
                fullWidth = {true}
                margin="dense"
                helperText={meta.error && meta.touched ? meta.error : ''}
                variant="outlined"
                autoComplete= "nope"
                required={required ? true : false}
                error={meta.error && meta.touched ? true : false}
                InputLabelProps={{
                    classes: {
                      root: this.props.classes.label,
                      error: this.props.classes.error,
                      shrink: this.props.classes.shrink,
                    }
                }}
                {...input}
            />
        );
    };

    onSubmit = formValues => {
        this.props.createHome(formValues);
        this.props.reset();
        this.state.success = 1;
        this.state.submittedValues = formValues;
    }

    render(){
        const { classes } = this.props;

        return (
            <div className ={`${classes.flexContainer} ${classes.pageContainer}`}>
                <Paper className={classes.paper}>
                    <Typography className={classes.header}>
                        Create Home
                    </Typography>
                    <form onSubmit = {this.props.handleSubmit(this.onSubmit)} noValidate className={classes.flexContainer}>
                        <Field 
                            name = "home_name" 
                            component={this.renderInput} 
                            label="Home Name" 
                            placeholder="Home Name" 
                            required="required"
                            className={classes.inputField}
                        />
                    
                        <Field 
                            name = "primary_first_name" 
                            component={this.renderInput} 
                            label="Primary First Name" 
                            placeholder="Primary First Name" 
                            required="required"
                            className={classes.inputField}
                        />
                    
                        <Field 
                            name = "primary_last_name" 
                            component={this.renderInput} 
                            label="Primary Last Name" 
                            placeholder="Primary Last Name" 
                            required="required"
                            className={classes.inputField}
                        />
                        <Button variant="contained" type="submit" color="primary" size="medium" className={classes.button}>
                            Submit
                        </Button>
                        {this.renderSuccess()}  
                    </form>
                </Paper>
            </div>
        );
    };
}

//Assign errors --- if redux form detects a key returned by validate that is the same as field name, it will take error message and pass it into Field's renderInput
const validate = (formValues) => {
    const errors = {};
    
    if(!formValues.home_name) {
        errors.home_name = 'You must enter a home name';
    }

    if(!formValues.primary_first_name) {
        errors.primary_first_name = 'You must enter the primary\'s first name';
    }

    if(!formValues.primary_last_name) {
        errors.primary_last_name = 'You must enter the primary\'s last name';
    }

    return errors;
};

const mapStateToProps = (state) => {
    return { homes: Object.values(state.homes)}; //Object.values turns it into an array so it's easier for us to loop through
};

HomeCreate.propTypes = {
    classes: PropTypes.object.isRequired,
};


const formWrapped = reduxForm({ 
    form: 'homeCreate', 
    touchOnBlur : false, 
    validate: validate
})(HomeCreate);

export default connect(mapStateToProps, { createHome })(withStyles(styles)(formWrapped));

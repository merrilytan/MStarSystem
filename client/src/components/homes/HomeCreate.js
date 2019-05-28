import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { createHome } from '../../actions';

const styles = theme => ({
    button: {
        margin: theme.spacing.unit,
        boxShadow: 'none',
        marginTop: '25px',
        marginBottom: 0,
        '&:hover': {
            color: '#fff',
        },
        '&:focus': {
            boxShadow: 'none'
        }
    },
    card: {
        minWidth: 275,
        maxWidth: 325,
        padding: '30px 40px',
        textAlign: 'center',
    },
    flexContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
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
    pageContainer: {
        minHeight: 'calc(100vh - 64px)'
    },
    inputField: {
        marginBottom: 10,
    },
});

class HomeCreate extends React.Component {

    state = {};

    handleChange = name => event => {
        this.setState({
          [name]: event.target.value,
        });
    };

    // renderError({ error, touched }){
    //     if(touched && error) {
    //         return (
    //             <div className="ui error message">
    //                 <div className="header">{error}</div>
    //             </div>
    //         );
    //     }
    // }

    renderSuccess(){
        if(this.state.success) {
            return (
                <div class="ui success message">
                    <div class="header">New Home Created</div>
                </div>
            );
        }
    }

    //error is inside meta
    renderInput = ({ input, label, meta, className, required, InputLabelProps, InputProps }) => {
        //const className = `field required ${meta.error && meta.touched ? 'error' : ''} ${required ? 'required' : ''}`;
        console.log('meta.error', meta);
        return (
            <TextField
                id="outlined-helperText"
                label={label}
                // defaultValue = {placeholder}
                className={className}
                fullWidth = {true}
                margin="dense"
                helperText={meta.error && meta.touched ? meta.error : ''}
                variant="outlined"
                autoComplete= "nope"
                InputLabelProps={InputLabelProps}
                InputProps={InputProps}
                required={required ? true : false}
                error={meta.error && meta.touched ? true : false}
                {...input}
            />
        );
    };

    onSubmit = formValues => {
        this.props.createHome(formValues);
        this.props.reset();
        this.state.success = 1;
    }

    render(){
        const { classes } = this.props;

        return (
            <div className ={`${classes.flexContainer} ${classes.pageContainer}`}>
                <Card className={classes.card}>
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
                </Card>
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

HomeCreate.propTypes = {
    classes: PropTypes.object.isRequired,
};


const formWrapped = reduxForm({ 
    form: 'homeCreate', 
    touchOnBlur : false, 
    validate: validate
})(HomeCreate);

export default connect(null, { createHome })(withStyles(styles)(formWrapped));

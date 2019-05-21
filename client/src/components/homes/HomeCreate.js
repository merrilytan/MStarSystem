import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createHome } from '../../actions';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import Card from '@material-ui/core/Card';
import CardContent from '@material-ui/core/CardContent'
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    card: {
        minWidth: 275,
        maxWidth: 400,
        textAlign: 'center',
    },
    container: {
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        flexWrap: 'wrap',
        alignItems: 'center',
    },
    header: {
        paddingTop: '30px',
        paddingBottom: '20px',
        textTransform: 'uppercase',
        color: '#2196f3',
        flexGrow: 1,
    },
    pageContainer: {
        minHeight: 'calc(100vh - 64px)'
    },
    textField: {
        marginTop: 0,
        marginBottom: 20,
    },
    grid: {
        width: '80%',
    },
    // menu: {
    //     width: 200
    // },
    cssOutlinedInput: {
        // "&:not(hover):not($disabled):not($cssFocused):not($error) $notchedOutline": {
        //   borderColor: "red" //default      
        // },
        // "&:hover:not($disabled):not($cssFocused):not($error) $notchedOutline": {
        //   borderColor: "blue" //hovered
        // },
        "&$cssFocused $notchedOutline": {
          borderColor: '#2196f3', //focused
        }
    },
    notchedOutline: {},
    cssLabel: {},
    cssFocused: {
        color: '#2196f3 !important'
    },
    error: {},
    disabled: {},
    // helper: {
    //     "#outlined-helperText-helper-text": {
    //         marginTop: '4px'
    //     }
    // }
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
    renderInput = ({ input, label, meta, className, placeholder, required, InputLabelProps, InputProps }) => {
        //const className = `field required ${meta.error && meta.touched ? 'error' : ''} ${required ? 'required' : ''}`;
        console.log('meta.error', meta);
        return (
            <TextField
                id="outlined-helperText"
                label={label}
                defaultValue = {placeholder}
                className={className}
                fullWidth = "true"
                margin="normal"
                helperText={meta.error && meta.touched ? meta.error : ''}
                variant="outlined"
                autoComplete= "nope"
                InputLabelProps={InputLabelProps}
                InputProps={InputProps}
                required={required ? 'true' : 'false'}
                error={meta.error && meta.touched ? 'true' : ''}
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
            <div className ={`${classes.container} ${classes.pageContainer}`}>
            <Card className={classes.card}>
                <Typography variant="h6" className={classes.header}>
                    Create Home
                </Typography>
                <CardContent>
                    {/* <div class="ui hidden divider"></div> */}
                    {/* handleSubmit is from redux form. it automatically adds event.preventDefault */}
                    <form onSubmit = {this.props.handleSubmit(this.onSubmit)} noValidate className={classes.container}>
                    <Grid 
                        container 
                        spacing={12}
                        className={classes.grid}
                        alignItems='center'
                        direction='row'
                        justify='center'
                        >
                        <Grid item xs={12}>
                            <Field 
                                name = "home_name" 
                                component={this.renderInput} 
                                label="Home Name" 
                                placeholder="Home Name" 
                                required="required"
                                className={classes.textField} 
                                InputLabelProps={{ classes: { className: classes.cssFocused, root: classes.cssLabel, focused: classes.cssFocused } }}
                                InputProps={{ classes: { root: classes.cssOutlinedInput, focused: classes.cssFocused, notchedOutline: classes.notchedOutline } }} 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field 
                                name = "primary_first_name" 
                                component={this.renderInput} 
                                label="Primary First Name" 
                                placeholder="Primary First Name" 
                                required="required"
                                className={classes.textField} 
                                InputLabelProps={{ classes: { className: classes.cssFocused, root: classes.cssLabel, focused: classes.cssFocused } }}
                                InputProps={{ classes: { root: classes.cssOutlinedInput, focused: classes.cssFocused, notchedOutline: classes.notchedOutline } }} 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <Field 
                                name = "primary_last_name" 
                                component={this.renderInput} 
                                label="Primary Last Name" 
                                placeholder="Primary Last Name" 
                                required="required"
                                className={classes.textField} 
                                InputLabelProps={{ classes: { className: classes.cssFocused, root: classes.cssLabel, focused: classes.cssFocused } }}
                                InputProps={{ classes: { root: classes.cssOutlinedInput, focused: classes.cssFocused, notchedOutline: classes.notchedOutline } }} 
                            />
                        </Grid>
                        <Grid item xs={12}>
                            <button className="ui button">Submit</button>
                            {this.renderSuccess()}
                        </Grid>
                    </Grid>
                    </form>
                </CardContent>
                
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

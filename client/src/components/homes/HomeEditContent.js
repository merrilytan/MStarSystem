import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import diff from 'object-diff';
import { withSnackbar } from 'notistack';
import { withStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';
import { editHome } from '../../actions';
import { checkDate, isEmpty } from '../../js/functions';

const styles = theme => ({
    button: {
        boxShadow: 'none',
        marginBottom: 0,
        '&:hover': {
            color: '#fff',
        },
        '&:focus': {
            boxShadow: 'none'
        }
    },
    contentArea: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#f3f3f4'
    },
    form: {
        width: '80%',
        marginTop: '50px',
        marginBottom: '50px',
        maxWidth: '650px',
    },
    formSectionHeader: {
        display: 'flex',
        alignItems: 'center',
        height: '30px',
        marginBottom: '30px'
    },
    formSection: {
        marginBottom: '20px',
    },
    header: {
        color: '#fff',
        display: 'inline-block',
        fontSize: '16px',
        flexGrow: '1',
        fontWeight: 'bold',
        position: 'absolute',
        paddingRight: '10px',
        textTransform: 'uppercase',
        lineHeight: '16px',
        position: 'absolute',
        color: '#2196f3',
        backgroundColor: '#f3f3f4'
    },
    helperOrange: {
        color: '#fff',
        backgroundColor: '#ffc34d',
        border: '1px solid #ffc34d',
        margin: '-5px 0px 0px 0px',
        zIndex: '5',
        color: '#fff',
        padding: '3px 15px',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
        fontSize: '12px',
    },
    helperRed: {
        color: '#fff',
        backgroundColor: '#e57373',
        border: '1px solid #e57373',
        margin: '-5px 0px 0px 0px',
        zIndex: '5',
        color: '#fff',
        padding: '3px 15px',
        borderBottomLeftRadius: '4px',
        borderBottomRightRadius: '4px',
        fontSize: '12px',
    },
    inputThreeFields: {
        marginBottom: '20px',
        width: '32%',
    },
    inputTwoFields: {
        marginBottom: '20px',
        width: '49%',
    },
    label: {
        backgroundColor: '#f3f3f4',
        zIndex: '1000',
        minWidth: '75px',
    },
    line: {
        width: '100%',
        border: '0',
        margin: '1em 0',
        display: 'block',
        padding: '0',
        borderTop: '1px solid #2196f3',
    },
    shrink: {
        backgroundColor: '#f3f3f4',
        minWidth: '1px',
    },
    threeFields: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
    },
    twoFields: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        flexWrap: 'nowrap',
    },
    '@media (max-width: 500px)': {
        inputThreeFields: {
          width: '100%',
        },
        inputTwoFields: {
            width: '100%',
        },
        twoFields: {
            flexWrap: 'wrap',
        },
        threeFields: {
            flexWrap: 'wrap',
        },
    },
});

class HomeEditContent extends React.Component {

    // renderError({ error, touched }){
    //     if(touched && error) {
    //         return (
    //             <div className="ui error message">
    //                 <div className="header">{error}</div>
    //             </div>
    //         );
    //     }
    // }

    renderDatePicker = ({ input, label, meta, required, className }) => {
        
        let dateStatus = '';
        if(input.value && label != "Date Home Opened") {
            dateStatus = checkDate(input.value);
        }
        console.log('meta', meta);

        let helperText = '';
        let helperClass = {};
        let inputClass = {};

        if(meta.error){
            helperText=meta.error;
        } else if (dateStatus == 'expired'){
            helperText='Expired';
            helperClass={
                classes: {
                  root: this.props.classes.helperRed,
                }
            };
        } else if (dateStatus == 'almost-expired'){
            helperText='Expiring soon';
            helperClass={
                classes: {
                  root: this.props.classes.helperOrange,
                }
            };
        }

        return (
            <TextField
            id="outlined-helperText"
            label={label}
            className={className}
            type="date"
            fullWidth = {true}
            margin="dense"
            helperText={helperText}
            variant="outlined"
            autoComplete= "nope"
            required={required ? true : false}
            error={meta.error && meta.touched ? true : false}
            InputLabelProps={{
                classes: {
                  root: this.props.classes.label,
                  shrink: this.props.classes.shrink,
                }
            }}
            FormHelperTextProps={helperClass}
            InputProps={inputClass}
            {...input}
        />
        );
    };

    renderInput = ({ input, label, meta, required, className }) => {
        return (
            <TextField
                id="outlined-helperText"
                label={label}
                className={className}
                fullWidth = {true}
                margin="dense"
                helperText={meta.error ? meta.error : ''}
                variant="outlined"
                autoComplete= "nope"
                required={required ? true : false}
                error={meta.error ? true : false}
                InputLabelProps={{
                    classes: {
                      root: this.props.classes.label,
                      shrink: this.props.classes.shrink,
                    }
                }}
                {...input}
            />
        );
    };

    onSubmit = formValues => {
        const changedValues = diff(this.props.initialValues, formValues);
        if(!isEmpty(changedValues)){
            this.props.editHome(this.props.home.home_id, changedValues)
                .then((response) => {this.props.enqueueSnackbar('Successfully saved changes.', { variant: 'success' })})
                .catch((error) => console.log(error));
        }

    };

    renderSection = (selection) => {
        const { classes } = this.props;   

        if(selection === '0'){
            return (
                <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className={classes.form}>
                    <div className={classes.formSection}>
                        <div className={classes.formSectionHeader}>
                        <hr className={classes.line}></hr>
                            <Typography className={classes.header}>
                                Home
                            </Typography>
                        </div>
                        <div className={classes.formSectionContent}>
                            <div className={classes.twoFields}>
                                <Field name="street_address" component={this.renderInput} label="Street Address" className={classes.inputTwoFields} Input />
                                <Field name="apt_no" component={this.renderInput} label="Apt #" className={classes.inputTwoFields} />
                            </div>   
                            <div className={classes.threeFields}>
                                <Field name="city" component={this.renderInput} label="City" className={classes.inputThreeFields} />
                                <Field name="postal_code" component={this.renderInput} label="Postal Code" className={classes.inputThreeFields} />
                                <Field name="home_phone" component={this.renderInput} label="Home Phone" className={classes.inputThreeFields} />
                            </div> 
                            <div className={classes.twoFields}>
                                <Field name="home_opened" component={this.renderDatePicker} label="Date Home Opened" className={classes.inputTwoFields} />
                                <Field name="home_name" component={this.renderInput} label="Home Name" className={classes.inputTwoFields} />
                            </div>   
                        </div>
                    </div>
                    <div className={classes.formSection}>
                        <div className={classes.formSectionHeader}>
                        <hr className={classes.line}></hr>
                            <Typography className={classes.header}>
                                Primary
                            </Typography>
                        </div>
                        <div className={classes.formSectionContent}>
                            <div className={classes.twoFields}>
                                <Field name="primary_first_name" component={this.renderInput} label="First Name" required="required" className={classes.inputTwoFields} />
                                <Field name="primary_last_name" component={this.renderInput} label="Last Name" required="required" className={classes.inputTwoFields} />
                            </div>   
                            <div className={classes.twoFields}>
                                <Field name="primary_cell" component={this.renderInput} label="Cell Phone" className={classes.inputTwoFields} />
                                <Field name="primary_email" component={this.renderInput} label="Email" className={classes.inputTwoFields} />
                            </div> 
                        </div>
                    </div>
                    <div className={classes.formSection}>
                        <div className={classes.formSectionHeader}>
                        <hr className={classes.line}></hr>
                            <Typography className={classes.header}>
                                Secondary
                            </Typography>
                        </div>
                        <div className={classes.formSectionContent}>
                            <div className={classes.twoFields}>
                                <Field name="secondary_first_name" component={this.renderInput} label="First Name" className={classes.inputTwoFields} />
                                <Field name="secondary_last_name" component={this.renderInput} label="Last Name" className={classes.inputTwoFields} />
                            </div>   
                            <div className={classes.twoFields}>
                                <Field name="secondary_cell" component={this.renderInput} label="Cell Phone" className={classes.inputTwoFields} />
                                <Field name="secondary_email" component={this.renderInput} label="Email" className={classes.inputTwoFields} />
                            </div> 
                        </div>
                    </div>          
                    <Button variant="contained" type="submit" color="primary" size="medium" className={classes.button}>
                        Save Changes
                    </Button>          
                </form>
            );
        } else if(selection === '1'){
            return (
                <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className={classes.form}>
                    <div className={classes.formSection}>
                        <div className={classes.formSectionHeader}>
                        <hr className={classes.line}></hr>
                            <Typography className={classes.header}>
                                Home  
                            </Typography>
                        </div>
                        <div className={classes.formSectionContent}>
                            <div className={classes.threeFields}>
                                <Field name="home_insurance" component={this.renderDatePicker} label="Home Insurance" className={classes.inputThreeFields} />
                                <Field name="auto_insurance_1" component={this.renderDatePicker} label="Auto Insurance 1" className={classes.inputThreeFields} />
                                <Field name="auto_insurance_2" component={this.renderDatePicker} label="Auto Insurance 2" className={classes.inputThreeFields} />
                            </div>   
                        </div>
                    </div>
                    <div className={classes.formSection}>
                        <div className={classes.formSectionHeader}>
                        <hr className={classes.line}></hr>
                            <Typography className={classes.header}>
                                Primary  
                            </Typography>
                        </div>
                        <div className={classes.formSectionContent}>
                            <div className={classes.threeFields}>
                                <Field name="primary_drivers_license" component={this.renderDatePicker} label="Drivers License" className={classes.inputThreeFields} />
                                <Field name="primary_cpr" component={this.renderDatePicker} label="CPR" className={classes.inputThreeFields} />
                                <Field name="primary_cpi" component={this.renderDatePicker} label="CPI" className={classes.inputThreeFields} />
                            </div>   
                        </div>
                    </div>
                    <div className={classes.formSection}>
                        <div className={classes.formSectionHeader}>
                        <hr className={classes.line}></hr>
                            <Typography className={classes.header}>
                                Secondary  
                            </Typography>
                        </div>
                        <div className={classes.formSectionContent}>
                            <div className={classes.threeFields}>
                                <Field name="secondary_drivers_license" component={this.renderDatePicker} label="Drivers License" className={classes.inputThreeFields} />
                                <Field name="secondary_cpr" component={this.renderDatePicker} label="CPR" className={classes.inputThreeFields} />
                                <Field name="secondary_cpi" component={this.renderDatePicker} label="CPI" className={classes.inputThreeFields} />
                            </div>   
                        </div>
                    </div>
                    <Button variant="contained" type="submit" color="primary" size="medium" className={classes.button}>
                        Save Changes
                    </Button> 
                </form>
            );
        } else if(selection === '2'){
            return (
                <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className={classes.form}>
                    <div className={classes.formSection}>
                        <div className={classes.formSectionHeader}>
                        <hr className={classes.line}></hr>
                            <Typography className={classes.header}>
                                Annual  
                            </Typography>
                        </div>
                        <div className={classes.formSectionContent}>
                            <div className={classes.threeFields}>
                                <Field name="home_study" component={this.renderDatePicker} label="Home Study" className={classes.inputThreeFields} />
                                <Field name="annual_review" component={this.renderDatePicker} label="Annual Review" className={classes.inputThreeFields} />
                                <Field name="fire_safety_plan" component={this.renderDatePicker} label="Fire Safety Plan" className={classes.inputThreeFields} />
                            </div>
                            <div className={classes.twoFields}>
                                <Field name="home_health_safety_plan" component={this.renderDatePicker} label="Home Health Safety Plan" className={classes.inputTwoFields} />
                                <Field name="service_contract" component={this.renderDatePicker} label="Service Contract" className={classes.inputTwoFields} />
                            </div>      
                        </div>
                        
                    </div>
                    <Button variant="contained" type="submit" color="primary" size="medium" className={classes.button}>
                        Save Changes
                    </Button> 
                </form>
            );
        }
    };

    render() {
        const { classes, selection, home } = this.props;  

        return (
            <div className = {classes.contentArea}>
                {this.renderSection(selection)}
            </div>
        );
    }
};

const validate = (formValues, props) => {
    const errors = {};

    if(!formValues.primary_first_name) {
        errors.primary_first_name = 'You must enter the primary\'s first name';
    }

    if(!formValues.primary_last_name) {
        errors.primary_last_name = 'You must enter the primary\'s last name';
    }

    // if(Object.entries(errors).length !== 0){
    //     console.log('errors', errors);
    //     props.enqueueSnackbar('Could not save due to errors!');
    // }

    return errors;
};

const mapStateToProps = (state) => {
    return { 
        initialValues: { 
            ...state.home
        },
        home: state.home
    };
};

HomeEditContent.propTypes = {
    classes: PropTypes.object.isRequired,
    selection: PropTypes.string.isRequired,
};

const formWrapped = reduxForm({ 
    form: 'homeEdit', 
    enableReinitialize : true,
    touchOnBlur : false, 
    validate: validate,
    // shouldValidate: (obj) =>  obj.props.submitting ? true : true,
})(HomeEditContent);

export default connect(mapStateToProps, { editHome })(withStyles(styles)(withSnackbar(formWrapped)));




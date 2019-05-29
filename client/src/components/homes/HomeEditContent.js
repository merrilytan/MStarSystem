import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import { editHome } from '../../actions';
import { checkDate, isEmpty } from '../../js/functions';
import diff from 'object-diff';
import TextField from '@material-ui/core/TextField';
import Typography from '@material-ui/core/Typography';

const styles = theme => ({
    contentArea: {
        width: '100%',
        display: 'flex',
        justifyContent: 'center',
        backgroundColor: '#f3f3f4'
    },
    form: {
        width: '70%',
        marginTop: '50px',
        maxWidth: '765px',
    },
    formSectionContent: {
        padding: '4% 5%',
    },
    formSectionHeader: {
        display: 'flex',
        alignItems: 'center',
        padding: '0% 5%',
        height: '40px',
        backgroundColor: '#ddd'
    },
    formSection: {
        borderRadius: '4px',
        border: '1px solid #ddd',
        marginBottom: '20px',
        // borderTop: '40px solid #ddd',
        backgroundColor: '#fff'
    },
    header: {
        color: '#2196f3',
        display: 'inline-block',
        fontSize: '16px',
        flexGrow: '1',
        fontWeight: 'bold',
        // marginTop: '-58px',
        position: 'absolute',
        backgroundColor: '#f3f3f4',
        //backgroundColor: '#fff',
        paddingRight: '10px',
        textTransform: 'uppercase',
        backgroundColor: '#ddd',
        lineHeight: '16px',
    },
    inputField: {
        marginBottom: '20px',
        width: '48%',
    },
    line: {
        height: '1px',
        border: '0',
        margin: '1em 0',
        display: 'block',
        padding: '0',
        borderTop: '1px solid #2196f3',
        marginBottom: '35px',
    },
    twoFields: {
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between'
    }
});

class HomeEditContent extends React.Component {

    renderError({ error, touched }){
        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    // renderInput = ({ input, label, meta, placeholder, required }) => {
    //     const className = `field ${meta.error && meta.touched ? 'error' : ''} ${required ? 'required' : ''}`;

    //     return (
    //         <div className={className}>
    //             <label>{label}</label>
    //             <input {...input} autoComplete="off" placeholder={placeholder} />
    //             {this.renderError(meta)}
    //         </div>
    //     );
    // };

    renderDatePicker = ({ input, label, meta, placeholder }) => {
        
        let dateStatus = '';
        if(input.value && label != "Date Home Opened") {
            dateStatus = checkDate(input.value);
        }

        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        const classNameInput = `${dateStatus == "expired" ? "expired" : ""} ${dateStatus == "almost-expired" ? "almost-expired" : ""}`;

        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} type="date" autoComplete="off" placeholder={placeholder} className = {classNameInput} />
                {this.renderError(meta)}
            </div>
        );
    };

    renderInput = ({ input, label, meta, required }) => {
        //const className = `field required ${meta.error && meta.touched ? 'error' : ''} ${required ? 'required' : ''}`;
        console.log('meta.error', meta);
        return (
            <TextField
                id="outlined-helperText"
                label={label}
                // defaultValue = {placeholder}
                className={this.props.classes.inputField}
                fullWidth = {true}
                margin="dense"
                helperText={meta.error && meta.touched ? meta.error : ''}
                variant="outlined"
                autoComplete= "nope"
                required={required ? true : false}
                error={meta.error && meta.touched ? true : false}
                {...input}
            />
        );
    };

    onSubmit = formValues => {
        const changedValues = diff(this.props.initialValues, formValues);
        console.log('submit', this.props.home);
        if(!isEmpty(changedValues)){
            this.props.editHome(this.props.home.home_id, changedValues);
        }
    };

    renderSection = (selection) => {
        if(selection === '0'){
            return (
                <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className={this.props.classes.form}>
                    <div className={this.props.classes.formSection}>
                        {/* <hr className={this.props.classes.line}></hr> */}
                        <div className={this.props.classes.formSectionHeader}>
                            <Typography className={this.props.classes.header}>
                                Primary
                            </Typography>
                        </div>
                        <div className={this.props.classes.formSectionContent}>
                            <div className={this.props.classes.twoFields}>
                                <Field name="primary_first_name" component={this.renderInput} label="First Name" placeholder="Primary First Name" required="required" />
                                <Field name="primary_last_name" component={this.renderInput} label="Last Name" placeholder="Primary Last Name" required="required"/>
                            </div>   
                            <div className={this.props.classes.twoFields}>
                                <Field name="primary_cell" component={this.renderInput} label="Cell Phone" placeholder="Primary Cell Phone" />
                                <Field name="primary_email" component={this.renderInput} label="Email" placeholder="Primary Email" />
                            </div> 
                        </div>
                    </div>
                    <div className={this.props.classes.formSection}>
                        <hr className={this.props.classes.line}></hr>
                        <Typography className={this.props.classes.header}>
                            Secondary
                        </Typography>
                        <div className={this.props.classes.twoFields}>
                            <Field name="secondary_first_name" component={this.renderInput} label="First Name" placeholder="Secondary First Name" />
                            <Field name="secondary_last_name" component={this.renderInput} label="Last Name" placeholder="Secondary Last Name" />
                        </div>   
                        <div className={this.props.classes.twoFields}>
                            <Field name="secondary_cell" component={this.renderInput} label="Cell Phone" placeholder="Secondary Cell Phone" />
                            <Field name="secondary_email" component={this.renderInput} label="Email" placeholder="Secondary Email" />
                        </div>
                    </div>  

                    <div className="ui hidden divider"></div>
                    <h4 className="ui horizontal divider section header teal">
                        Address
                    </h4>
                    <div className="two fields">
                        <div className="twelve wide field">
                            <Field name="street_address" component={this.renderInput} label="Street Address" placeholder="Street Address" />
                        </div>
                        <div className="four wide field">
                            <Field name="apt_no" component={this.renderInput} label="Apt #" placeholder="Apt #" />
                        </div>    
                    </div>  
                    <div className="three fields">
                        <Field name="city" component={this.renderInput} label="City" placeholder="City" />
                        <Field name="postal_code" component={this.renderInput} label="Postal Code" placeholder="Postal Code" />
                        <Field name="home_phone" component={this.renderInput} label="Home Phone" placeholder="Home Phone" />
                    </div>
                    <div className="ui hidden divider"></div>
                    <h4 className="ui horizontal divider section header teal">
                        Home Info
                    </h4> 
                    <div className="two fields">
                        <Field name="home_opened" component={this.renderDatePicker} label="Date Home Opened" placeholder="Date Home Opened" />
                        <Field name="home_name" component={this.renderInput} label="Home Name" placeholder="Home Name" />
                    </div>                        
                    <div className="field"><button className="ui button">Submit Changes</button></div>
                </form>
            );
        } else if(selection === '1'){
            return (
                <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    {/* <h4 className="ui dividing header">General Info</h4> */}
                    <h4 className="ui horizontal divider section header teal">
                        Primary
                    </h4>
                    <div className="three fields">
                        <Field name="primary_drivers_license" component={this.renderDatePicker} label="Primary Drivers License" placeholder="Expiry Date" />
                        <Field name="primary_cpr" component={this.renderDatePicker} label="Primary CPR" placeholder="Expiry Date" />
                        <Field name="primary_cpi" component={this.renderDatePicker} label="Primary CPI" placeholder="Expiry Date" />
                    </div>   
                    <div className="ui hidden divider"></div>
                    <h4 className="ui horizontal divider section header teal">
                        Secondary
                    </h4>
                    <div className="three fields">
                        <Field name="secondary_drivers_license" component={this.renderDatePicker} label="Secondary Drivers License" placeholder="Expiry Date" />
                        <Field name="secondary_cpr" component={this.renderDatePicker} label="Secondary CPR" placeholder="Expiry Date" />
                        <Field name="secondary_cpi" component={this.renderDatePicker} label="Secondary CPI" placeholder="Expiry Date" />
                    </div> 
                    <div className="ui hidden divider"></div>
                    <h4 className="ui horizontal divider section header teal">
                        Home
                    </h4>
                    <div className="three fields">
                        <Field name="home_insurance" component={this.renderDatePicker} label="Home Insurance" placeholder="Expiry Date" />
                        <Field name="auto_insurance_1" component={this.renderDatePicker} label="Auto Insurance 1" placeholder="Expiry Date" />
                        <Field name="auto_insurance_2" component={this.renderDatePicker} label="Auto Insurance 2" placeholder="Expiry Date" />
                    </div> 
                    <div className="ui hidden divider"></div>                
                    <div className="field"><button className="ui button">Submit Changes</button></div>
                </form>
            );
        } else if(selection === '2'){
            return (
                <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    {/* <h4 className="ui dividing header">General Info</h4> */}
                    <h4 className="ui horizontal divider section header teal">
                        Annual
                    </h4>
                    <div className="three fields">
                        <Field name="home_study" component={this.renderDatePicker} label="Home Study" placeholder="Expiry Date" />
                        <Field name="annual_review" component={this.renderDatePicker} label="Annual Review" placeholder="Expiry Date" />
                        <Field name="fire_safety_plan" component={this.renderDatePicker} label="Fire Safety Plan" placeholder="Expiry Date" />
                    </div> 
                    <div className="three fields">
                        <Field name="home_health_safety_plan" component={this.renderDatePicker} label="Home Health Safety Plan" placeholder="Expiry Date" />
                        <Field name="service_contract" component={this.renderDatePicker} label="Service Contract" placeholder="Expiry Date" />
                    </div> 
                    <div className="ui hidden divider"></div>                
                    <div className="field"><button className="ui button">Submit Changes</button></div>
                </form>
            );
        }
    };

    render() {
        const { classes, selection, home } = this.props;   
        console.log('this.props', this.props);
        return (
            <div className = {classes.contentArea}>
                {this.renderSection(selection)}
            </div>
        );
    }
};

const validate = (formValues) => {
    const errors = {};

    if(!formValues.primaryFirstName) {
        errors.primaryFirstName = 'You must enter the primary\'s first name';
    }

    if(!formValues.primaryLastName) {
        errors.primaryLastName = 'You must enter the primary\'s last name';
    }

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

// const mapStateToProps = (state) => {
//     return { 
//         initialValues: { 
//             ...state.home
//         },
//         home: state.home
//     };
// };

const formWrapped = reduxForm({ 
    form: 'homeEdit', 
    enableReinitialize : true,
    touchOnBlur : false, 
    validate: validate
})(HomeEditContent);

export default connect(mapStateToProps, { editHome })(withStyles(styles)(formWrapped));





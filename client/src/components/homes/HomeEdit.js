import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';

import PropTypes from 'prop-types';
import classNames from 'classnames';
import { withStyles } from '@material-ui/core/styles';
import HomeIcon from '@material-ui/icons/HomeRounded';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import { fetchHome, editHome } from '../../actions';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';

import HomeEditContent from './HomeEditContent';

const styles = theme => ({
    contentArea: {
        backgroundColor: '#fff',
        width: '100%',
    },
    form: {
        margin: '80px',
    },
    header: {
        display: 'flex',
        width: '90%',
        marginTop: '50px',
        marginBottom: '15px'
    },
    headerHomeIcon: {
        color: 'rgba(0, 0, 0, 0.54)',
        fontSize: '50px',
    },
    headerHomeName: {
        color: '#2196f3',
        fontSize: '25px',
        fontWeight: 'bold',
        lineHeight: '25px',
    },  
    headerHomeTitle: {
        display: 'inline-block',
        marginLeft: '5px',
        marginTop: '3px',
    },
    headerPeopleName: {
        margin: 0,
    },
    pageContainer: {
        width: '100%',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: '#fff'
    },
    subMenu: {
        flexGrow: '1',
        boxShadow: 'none',
        borderTop: '1px solid #e1e4e8',
        borderBottom: '1px solid #e1e4e8',
        borderRadius: 'none',
        backgroundColor: '#fff'
    },
    subMenuContainer: {
        width: '100%',
    },
    tab: {
        fontWeight: 'bold'
    },






    
    // homeNameTitle: {
    //     color: '#2196f3',
    //     fontSize: '20px',
    // },


    // container: {
    //     display: 'flex',
    //     flexWrap: 'wrap',
    // },
    // textField: {
    //     marginLeft: theme.spacing.unit,
    //     marginRight: theme.spacing.unit,
    // },
    // dense: {
    //     marginTop: 16,
    // },
    // menu: {
    //     width: 200,
    // },
    // root: {
    //     flexGrow: 1,
    // },
    // paper: {
    //     padding: theme.spacing.unit * 2,
    //     textAlign: 'center',
    //     color: theme.palette.text.secondary,
    // },

});


class HomeEdit extends React.Component {

    state = { 
        addClassGeneral: 'item active',
        addClassPersonalDocs: 'item',
        addClassHomeDocs: 'item',
        selection: '0',
    };

    componentDidMount() {
        this.props.fetchHome(this.props.match.params.id);
    }

    // renderError({ error, touched }){
    //     if(touched && error) {
    //         return (
    //             <div className="ui error message">
    //                 <div className="header">{error}</div>
    //             </div>
    //         );
    //     }
    // }

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

    // renderDatePicker = ({ input, label, meta, placeholder }) => {
        
    //     let dateStatus = '';
    //     if(input.value && label != "Date Home Opened") {
    //         dateStatus = checkDate(input.value);
    //     }

    //     const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
    //     const classNameInput = `${dateStatus == "expired" ? "expired" : ""} ${dateStatus == "almost-expired" ? "almost-expired" : ""}`;

    //     return (
    //         <div className={className}>
    //             <label>{label}</label>
    //             <input {...input} type="date" autoComplete="off" placeholder={placeholder} className = {classNameInput} />
    //             {this.renderError(meta)}
    //         </div>
    //     );
    // };

    // onSubmit = formValues => {
    //     const changedValues = diff(this.props.initialValues, formValues);

    //     if(!isEmpty(changedValues)){
    //         this.props.editHome(this.props.home.home_id, changedValues);
    //     }
    // };

    // renderSection = (selection) => {
    //     if(selection === '0'){
    //         return (
    //             <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className={this.classes.form}>
    //                 <h4 className="ui horizontal divider section header teal">
    //                     Primary
    //                 </h4>
    //                 <div className="two fields">
    //                     <Field name="primary_first_name" component={this.renderInput} label="First Name" placeholder="Primary First Name" required="required" />
    //                     <Field name="primary_last_name" component={this.renderInput} label="Last Name" placeholder="Primary Last Name" required="required"/>
    //                 </div>   
    //                 <div className="two fields">
    //                     <Field name="primary_cell" component={this.renderInput} label="Cell Phone" placeholder="Primary Cell Phone" />
    //                     <Field name="primary_email" component={this.renderInput} label="Email" placeholder="Primary Email" />
    //                 </div> 
    //                 <h4 className="ui horizontal divider section header teal">
    //                     Secondary
    //                 </h4>
    //                 <div className="two fields">
    //                     <Field name="secondary_first_name" component={this.renderInput} label="First Name" placeholder="Secondary First Name" />
    //                     <Field name="secondary_last_name" component={this.renderInput} label="Last Name" placeholder="Secondary Last Name" />
    //                 </div>   
    //                 <div className="two fields">
    //                     <Field name="secondary_cell" component={this.renderInput} label="Cell Phone" placeholder="Secondary Cell Phone" />
    //                     <Field name="secondary_email" component={this.renderInput} label="Email" placeholder="Secondary Email" />
    //                 </div>  
    //                 <div className="ui hidden divider"></div>
    //                 <h4 className="ui horizontal divider section header teal">
    //                     Address
    //                 </h4>
    //                 <div className="two fields">
    //                     <div className="twelve wide field">
    //                         <Field name="street_address" component={this.renderInput} label="Street Address" placeholder="Street Address" />
    //                     </div>
    //                     <div className="four wide field">
    //                         <Field name="apt_no" component={this.renderInput} label="Apt #" placeholder="Apt #" />
    //                     </div>    
    //                 </div>  
    //                 <div className="three fields">
    //                     <Field name="city" component={this.renderInput} label="City" placeholder="City" />
    //                     <Field name="postal_code" component={this.renderInput} label="Postal Code" placeholder="Postal Code" />
    //                     <Field name="home_phone" component={this.renderInput} label="Home Phone" placeholder="Home Phone" />
    //                 </div>
    //                 <div className="ui hidden divider"></div>
    //                 <h4 className="ui horizontal divider section header teal">
    //                     Home Info
    //                 </h4> 
    //                 <div className="two fields">
    //                     <Field name="home_opened" component={this.renderDatePicker} label="Date Home Opened" placeholder="Date Home Opened" />
    //                     <Field name="home_name" component={this.renderInput} label="Home Name" placeholder="Home Name" />
    //                 </div>                        
    //                 <div className="field"><button className="ui button">Submit Changes</button></div>
    //             </form>
    //         );
    //     } else if(selection === '1'){
    //         return (
    //             <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className="ui form error">
    //                 {/* <h4 className="ui dividing header">General Info</h4> */}
    //                 <h4 className="ui horizontal divider section header teal">
    //                     Primary
    //                 </h4>
    //                 <div className="three fields">
    //                     <Field name="primary_drivers_license" component={this.renderDatePicker} label="Primary Drivers License" placeholder="Expiry Date" />
    //                     <Field name="primary_cpr" component={this.renderDatePicker} label="Primary CPR" placeholder="Expiry Date" />
    //                     <Field name="primary_cpi" component={this.renderDatePicker} label="Primary CPI" placeholder="Expiry Date" />
    //                 </div>   
    //                 <div className="ui hidden divider"></div>
    //                 <h4 className="ui horizontal divider section header teal">
    //                     Secondary
    //                 </h4>
    //                 <div className="three fields">
    //                     <Field name="secondary_drivers_license" component={this.renderDatePicker} label="Secondary Drivers License" placeholder="Expiry Date" />
    //                     <Field name="secondary_cpr" component={this.renderDatePicker} label="Secondary CPR" placeholder="Expiry Date" />
    //                     <Field name="secondary_cpi" component={this.renderDatePicker} label="Secondary CPI" placeholder="Expiry Date" />
    //                 </div> 
    //                 <div className="ui hidden divider"></div>
    //                 <h4 className="ui horizontal divider section header teal">
    //                     Home
    //                 </h4>
    //                 <div className="three fields">
    //                     <Field name="home_insurance" component={this.renderDatePicker} label="Home Insurance" placeholder="Expiry Date" />
    //                     <Field name="auto_insurance_1" component={this.renderDatePicker} label="Auto Insurance 1" placeholder="Expiry Date" />
    //                     <Field name="auto_insurance_2" component={this.renderDatePicker} label="Auto Insurance 2" placeholder="Expiry Date" />
    //                 </div> 
    //                 <div className="ui hidden divider"></div>                
    //                 <div className="field"><button className="ui button">Submit Changes</button></div>
    //             </form>
    //         );
    //     } else if(selection === '2'){
    //         return (
    //             <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className="ui form error">
    //                 {/* <h4 className="ui dividing header">General Info</h4> */}
    //                 <h4 className="ui horizontal divider section header teal">
    //                     Annual
    //                 </h4>
    //                 <div className="three fields">
    //                     <Field name="home_study" component={this.renderDatePicker} label="Home Study" placeholder="Expiry Date" />
    //                     <Field name="annual_review" component={this.renderDatePicker} label="Annual Review" placeholder="Expiry Date" />
    //                     <Field name="fire_safety_plan" component={this.renderDatePicker} label="Fire Safety Plan" placeholder="Expiry Date" />
    //                 </div> 
    //                 <div className="three fields">
    //                     <Field name="home_health_safety_plan" component={this.renderDatePicker} label="Home Health Safety Plan" placeholder="Expiry Date" />
    //                     <Field name="service_contract" component={this.renderDatePicker} label="Service Contract" placeholder="Expiry Date" />
    //                 </div> 
    //                 <div className="ui hidden divider"></div>                
    //                 <div className="field"><button className="ui button">Submit Changes</button></div>
    //             </form>
    //         );
    //     }
    // };

    handleChange = (event, newValue) => {
        this.setState({ selection: newValue });
    };

    toggleMenu = (selection) => {
        if(selection === 0){
            this.setState({
                addClassGeneral: 'item active',
                addClassPersonalDocs: 'item',
                addClassHomeDocs: 'item', 
                section: 0
            });
        } else if(selection === 1) {
            this.setState({
                addClassGeneral: 'item',
                addClassPersonalDocs: 'item active',
                addClassHomeDocs: 'item',
                section: 1
            });
        } else if(selection === 2) {
            this.setState({
                addClassGeneral: 'item',
                addClassPersonalDocs: 'item',
                addClassHomeDocs: 'item active',
                section: 2
            });
        }
    }

    render(){
        const { classes, home } = this.props;

        return (
            <div className={classes.pageContainer}>
                <div className={classes.header}>
                    <HomeIcon className={classes.headerHomeIcon} />
                    <div className={classes.headerHomeTitle}>
                        <Typography color="primary" className={classes.headerHomeName}>{home.home_name}</Typography>
                        <Typography className={classes.headerPeopleName}>{`${home.primary_first_name} ${home.primary_last_name}`}{this.props.home.secondary_first_name ? ` & ${this.props.home.secondary_first_name}`  : ''}{this.props.home.secondary_last_name ? ` ${this.props.home.secondary_last_name}`  : ''}</Typography>
                    </div>
                </div>
                <div className={classes.subMenuContainer}>
                    <div className={classes.subMenu}>
                        <Tabs
                            value={this.state.selection}
                            onChange={this.handleChange}
                            indicatorColor="primary"
                            textColor="primary"                          
                            centered
                        >
                            <Tab label="General Info" value="0" className={classes.tab} />
                            <Tab label="Personal Docs" value="1" className={classes.tab}/>
                            <Tab label="Home Docs" value="2" className={classes.tab}/>
                        </Tabs>
                    </div>
                </div>
                <HomeEditContent selection={this.state.selection} home={home} />
            </div>
        );
    };
}



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

HomeEdit.propTypes = {
    classes: PropTypes.object.isRequired,
    home: PropTypes.object.isRequired,
};

const mapStateToProps = (state) => {
    return { 
        initialValues: { 
            ...state.home
        },
        home: state.home
    };
};

const formWrapped = reduxForm({ 
    form: 'homeEdit', 
    enableReinitialize : true,
    touchOnBlur : false, 
    validate: validate
})(HomeEdit);

export default connect(mapStateToProps, { fetchHome, editHome })(withStyles(styles)(formWrapped));

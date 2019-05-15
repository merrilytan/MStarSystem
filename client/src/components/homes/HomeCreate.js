import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createHome } from '../../actions';

class HomeCreate extends React.Component {

    renderError({ error, touched }){

        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    //error is inside meta
    renderInput = ({ input, label, meta, placeholder }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" placeholder={placeholder} />
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = formValues => {
        // this.props.onSubmit(formValues);  //onSubmit is prop we passed into component
        this.props.createHome(formValues);
    }

    render(){
        return (
            <div className = "ui two column centered grid">
                <div className = "column">
                    {/* handleSubmit is from redux form. it automatically adds event.preventDefault */}
                    <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className ="ui form error">
                        <Field name = "homeName" component={this.renderInput} label="Home Name" placeholder="Home Name" />
                        <Field name = "primaryFirstName" component={this.renderInput} label="First Name" placeholder="First Name" />
                        <Field name = "primaryLastName" component={this.renderInput} label="Last Name" placeholder="Last Name" />
                        <button className="ui button">Submit</button>
                    </form>
                </div>
            </div>
        );
    };
}

//Assign errors --- if redux form detects a key returned by validate that is the same as field name, it will take error message and pass it into Field's renderInput
const validate = (formValues) => {
    const errors = {};
    
    if(!formValues.homeName) {
        errors.homeName = 'You must enter a home name';
    }

    if(!formValues.primaryFirstName) {
        errors.primaryFirstName = 'You must enter the primary\'s first name';
    }

    if(!formValues.primaryLastName) {
        errors.primaryLastName = 'You must enter the primary\'s last name';
    }

    return errors;
};

//Bc need to connect 'connect' and 'reduxForm', need new syntax
const formWrapped = reduxForm({ 
    form: 'homeCreate', 
    validate: validate
})(HomeCreate);

export default connect(null, { createHome })(formWrapped);

//reduxForm wll pass tons of props into HomeCreate
// export default reduxForm({ //reduxForm very similar syntax with connect
//     form: 'homeCreate', //name of form
//     validate: validate
// })(HomeCreate);

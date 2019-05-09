import React from 'react';
import { Field, reduxForm } from 'redux-form';

class HomeInitialForm extends React.Component {

    renderError({ error, touched }){

        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderInput = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className={className}>
            <label>{label}</label>
            <input {...input} autoComplete="off" />
            {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = formValues => {
        this.props.onSubmit(formValues);
    }

    render(){
        return (
            <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className ="ui form error">
                <Field name = "homeName" component={this.renderInput} label="Home Name" />
                <Field name = "primaryFirstName" component={this.renderInput} label="First Name" />
                <Field name = "primaryLastName" component={this.renderInput} label="Last Name" />
                <button className="ui button primary">Submit</button>
            </form>
        );
    };
}

const validate = (formValues) => {
    const errors = {};
    
    if(!formValues.homeName) {
        //only ran if the user did not enter a title
        errors.homeName = 'You must enter a home name';
    }

    return errors;
};

//this wll pass tons of props into NewHome
export default reduxForm({ //reduxForm very similar syntax with connect
    form: 'homeInitialForm', //name of form
    validate: validate
})(HomeInitialForm);

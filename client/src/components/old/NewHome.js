import React from 'react';
import { Field, reduxForm } from 'redux-form';
import axios from 'axios';
import { connect } from 'react-redux';

class NewHome extends React.Component {

/*     renderError({ error, touched }){
        console.log(error, touched);
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

    onSubmit(formValues) {
        //can do whatever we want with formValues now!

        let formData = new FormData();
        formData.append('home_name', formValues.homeName);
        formData.append('primary_first_name', formValues.primaryFirstName);
        formData.append('primary_last_name', formValues.primaryLastName);

        axios({
            method: 'post',
            url: './../../api/homes.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
            console.log(response)

        })
        .catch(function (response) {
            //handle error
            console.log(response)
        });

    } */

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
        errors.homeName = 'You must enter a home name'
    }

    return errors;
};

//this wll pass tons of props into NewHome
export default reduxForm({ //reduxForm very similar syntax with connect
    form: 'newHome', //name of form
    validate: validate
})(NewHome);
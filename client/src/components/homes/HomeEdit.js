import React from 'react';
import { Field, reduxForm } from 'redux-form';

class HomeEdit extends React.Component {

    renderError({ error, touched }){

        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

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
        this.props.onSubmit(formValues);
    }

    onClick = () => {
            console.log('homeeee');

    }


    render(){
        return (
            <div className = "ui container">
                <h2 className="ui header">
                    <i className="home icon"></i>
                    <div className="content">
                        SMITH
                        <div className="sub header">John, Jane</div>
                    </div>
                </h2>

                <div className="ui top attached tabular menu">
                    <a className="item active" data-tab="first" onClick={this.onClick()} >First</a>
                    <a className="item" data-tab="second" onClick={this.onClick()} >Second</a>
                    <a className="item" data-tab="third" onClick={this.onClick()} >Third</a>
                </div>
                <div className="ui bottom attached tab segment active" data-tab="first">
                    First
                </div>
                <div className="ui bottom attached tab segment" data-tab="second">
                    Second
                </div>
                <div className="ui bottom attached tab segment" data-tab="third">
                    Third
                </div>



                <div className = "ui two column centered grid">
                    <div className = "column">
                        <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className ="ui form error">
                            <Field name = "homeName" component={this.renderInput} label="Home Name" placeholder="Home Name" />
                            <Field name = "primaryFirstName" component={this.renderInput} label="First Name" placeholder="First Name" />
                            <Field name = "primaryLastName" component={this.renderInput} label="Last Name" placeholder="Last Name" />
                            <button className="ui button">Submit</button>
                        </form>
                    </div>
                </div>
            </div>
        );
    };
}

const validate = (formValues) => {
    const errors = {};
    
    if(!formValues.homeName) {
        //only ran if the user did not enter a title
        errors.homeName = 'You must enter a home name';
    }

    if(!formValues.primaryFirstName) {
        //only ran if the user did not enter a title
        errors.primaryFirstName = 'You must enter the primary\'s first name';
    }

    if(!formValues.primaryLastName) {
        //only ran if the user did not enter a title
        errors.primaryLastName = 'You must enter the primary\'s last name';
    }

    return errors;
};

//this wll pass tons of props into NewHome
export default reduxForm({ //reduxForm very similar syntax with connect
    form: 'homeEdit', //name of form
    validate: validate
})(HomeEdit);

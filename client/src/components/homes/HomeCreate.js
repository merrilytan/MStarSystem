import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { createHome } from '../../actions';

class HomeCreate extends React.Component {

    state = {};

    renderError({ error, touched }){

        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

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
    renderInput = ({ input, label, meta, placeholder, required }) => {
        const className = `field required ${meta.error && meta.touched ? 'error' : ''} ${required ? 'required' : ''}`;

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
        this.props.reset();
        this.state.success = 1;
    }

    render(){
        return (
            <div>
                <div class="ui hidden divider"></div>
                <div className = "ui two column centered grid">
                    <div className = "column">
                        {/* handleSubmit is from redux form. it automatically adds event.preventDefault */}
                        <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className ="ui form error success">
                            <Field name = "home_name" component={this.renderInput} label="Home Name" placeholder="Home Name" required="required" />
                            <Field name = "primary_first_name" component={this.renderInput} label="First Name" placeholder="First Name" required="required"/>
                            <Field name = "primary_last_name" component={this.renderInput} label="Last Name" placeholder="Last Name" required="required"/>
                            <div class="field"><button className="ui button">Submit</button></div>
                            {this.renderSuccess()}
                        </form>
                    </div>
                </div>
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

//Bc need to connect 'connect' and 'reduxForm', need new syntax
const formWrapped = reduxForm({ 
    form: 'homeCreate', 
    touchOnBlur : false, 
    validate: validate
})(HomeCreate);

export default connect(null, { createHome })(formWrapped);

//reduxForm wll pass tons of props into HomeCreate
// export default reduxForm({ //reduxForm very similar syntax with connect
//     form: 'homeCreate', //name of form
//     validate: validate
// })(HomeCreate);

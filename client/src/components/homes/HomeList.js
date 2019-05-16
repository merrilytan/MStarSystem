import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import { fetchHomes } from '../../actions';
import HomeEdit from './HomeEdit';

class HomeList extends React.Component {
    state = {};

    componentDidMount() {
        this.props.fetchHomes();
    }

    renderError({ error, touched }){
        if(touched && error) {
            return (
                <div className="ui error message">
                    <div className="header">{error}</div>
                </div>
            );
        }
    }

    renderSelect = ({ input, label, meta }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

        return (
            <div className={className}>
                <label>{label}</label>
                <select {...input}>
                    <option value = "">Choose Home</option>
                    {this.props.homes.map((home) => (
                        <option value = {home.id}>{ home.home_name }</option>                      
                    ))}
                </select>
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = formValues => {
        // this.props.onSubmit(formValues);  //onSubmit is prop we passed into component
        console.log('formValues', formValues);
        //this.props.editHome(formValues);
        this.setState({home: formValues.homeSelected});
    }

    render() {
        if(this.state.home) {
            return(
                <HomeEdit selectedHome={this.state.home} />
            )
        }
        else {
            return (
                <div className = "ui two column centered grid">
                    <div className = "column">
                        {/* handleSubmit is from redux form. it automatically adds event.preventDefault */}
                        <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className ="ui form error">   
                            <Field name="homeSelected" component={this.renderSelect} label="Open Homes" />
                            <button className="ui button">Edit Home</button>
                        </form>
                    </div>
                </div>
            );
        }
    }
}

const validate = (formValues) => {
    const errors = {};
    
    if(formValues.homeSelected == "" || !formValues.homeSelected) {
        errors.homeSelected = 'You must choose a home to edit.';
    }

    return errors;
};


const mapStateToProps = (state) => {
    return { homes: Object.values(state.homes)}; //Object.values turns it into an array so it's easier for us to loop through
};


const formWrapped = reduxForm({ 
    form: 'homeList', 
    touchOnBlur : false, 
    validate: validate
})(HomeList);

export default connect(mapStateToProps, { fetchHomes })(formWrapped);
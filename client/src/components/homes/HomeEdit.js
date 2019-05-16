import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import { editHome } from '../../actions';

class HomeEdit extends React.Component {

    state = { 
        section: 0,
        addClassGeneral: 'item',
        addClassDocs: 'item'
    };

    componentDidMount() {
        this.props.editHome(this.props.selectedHome);
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
    };

    renderSection = (selection) => {
        if(selection === 0){
            //this.setState({addClassGeneral: 'item active'});
            return (
                <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <h4 className="ui dividing header">General Info</h4>
                    <div className="two fields">
                        <Field name="primary_first_name" component={this.renderInput} label="First Name" placeholder="First Name" />
                        <Field name="primary_last_name" component={this.renderInput} label="Last Name" placeholder="Last Name" />
                    </div>                  
                    <button className="ui button">Submit Changes</button>
                </form>
            );
        } else if(selection === 1){
            //this.setState({addClassDocs: 'item active'});
            return (
                <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    <h4 className="ui dividing header">Documents</h4>
                    <div className="two fields">
                        <Field name="primary_first_name" component={this.renderInput} label="First Name" placeholder="First Name" />
                        <Field name="primary_last_name" component={this.renderInput} label="Last Name" placeholder="Last Name" />
                    </div>                  
                    <button className="ui button">Submit Changes</button>
                </form>
            );
        }
    };

    render(){
        console.log('this.props', this.props);
        return (

                <div className="ui container">
                    <div class="ui hidden divider"></div>
                    <h1 class="ui header">
                        <i class="home icon grey"></i>
                        <div class="content">
                            {this.props.home.home_name}
                            <h5 className="grey">{this.props.home.primary_first_name}{' '}{this.props.home.primary_last_name}</h5>
                        </div>
                    </h1>
                    {/* <div class="ui secondary pointing menu">
                        <a class="item" onClick={()=>this.setState({section: 0})}>General Info</a>
                        <a class="item" onClick={()=>this.setState({section: 1})}>Documents</a>
                    </div> */}
                    <div class="ui two item menu">
                        <a class={this.state.addClassGeneral} onClick={()=>{this.setState({section: 0});this.setState({addClassGeneral: 'item active'});}}>General Info</a>
                        <a class={this.state.addClassDocs} onClick={()=>{this.setState({section: 1});this.setState({addClassDocs: 'item active'});}}>Documents</a>
                    </div>
                    {this.renderSection(this.state.section)}
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

export default connect(mapStateToProps, { editHome })(formWrapped);

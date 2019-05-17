import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { connect } from 'react-redux';
import diff from 'object-diff';
import { fetchHome, editHome } from '../../actions';

class HomeEdit extends React.Component {

    state = { 
        section: 0,
        addClassGeneral: 'item active',
        addClassPersonalDocs: 'item',
        addClassHomeDocs: 'item'
    };

    componentDidMount() {
        this.props.fetchHome(this.props.match.params.id);
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

    renderInput = ({ input, label, meta, placeholder, required }) => {
        console.log('required', required);
        const className = `field ${meta.error && meta.touched ? 'error' : ''} ${required ? 'required' : ''}`;

        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} autoComplete="off" placeholder={placeholder} />
                {this.renderError(meta)}
            </div>
        );
    };

    renderDatePicker = ({ input, label, meta, placeholder }) => {
        const className = `field ${meta.error && meta.touched ? 'error' : ''}`;

        return (
            <div className={className}>
                <label>{label}</label>
                <input {...input} type="date" autoComplete="off" placeholder={placeholder} />
                {this.renderError(meta)}
            </div>
        );
    };

    onSubmit = formValues => {
        const changedValues = diff(this.props.initialValues, formValues);
        this.props.editHome(this.props.home.id, changedValues);
    };

    renderSection = (selection) => {
        if(selection === 0){
            return (
                <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    {/* <h4 className="ui dividing header">General Info</h4> */}
                    <h4 class="ui horizontal divider section header teal">
                        Primary
                    </h4>
                    <div className="two fields">
                        <Field name="primary_first_name" component={this.renderInput} label="First Name" placeholder="Primary First Name" required="required" />
                        <Field name="primary_last_name" component={this.renderInput} label="Last Name" placeholder="Primary Last Name" required="required"/>
                    </div>   
                    <div className="two fields">
                        <Field name="primary_cell" component={this.renderInput} label="Cell Phone" placeholder="Primary Cell Phone" />
                        <Field name="primary_email" component={this.renderInput} label="Email" placeholder="Primary Email" />
                    </div> 
                    <div class="ui hidden divider"></div>
                    <h4 class="ui horizontal divider section header teal">
                        Secondary
                    </h4>
                    <div className="two fields">
                        <Field name="secondary_first_name" component={this.renderInput} label="First Name" placeholder="Secondary First Name" />
                        <Field name="secondary_last_name" component={this.renderInput} label="Last Name" placeholder="Secondary Last Name" />
                    </div>   
                    <div className="two fields">
                        <Field name="secondary_cell" component={this.renderInput} label="Cell Phone" placeholder="Secondary Cell Phone" />
                        <Field name="secondary_email" component={this.renderInput} label="Email" placeholder="Secondary Email" />
                    </div>  
                    <div class="ui hidden divider"></div>
                    <h4 class="ui horizontal divider section header teal">
                        Address
                    </h4>
                    <div class="two fields">
                        <div class="twelve wide field">
                            <Field name="street_address" component={this.renderInput} label="Street Address" placeholder="Street Address" />
                        </div>
                        <div class="four wide field">
                            <Field name="apt_no" component={this.renderInput} label="Apt #" placeholder="Apt #" />
                        </div>    
                    </div>  
                    <div className="three fields">
                        <Field name="city" component={this.renderInput} label="City" placeholder="City" />
                        <Field name="postal_code" component={this.renderInput} label="Postal Code" placeholder="Postal Code" />
                        <Field name="home_phone" component={this.renderInput} label="Home Phone" placeholder="Home Phone" />
                    </div>
                    <div class="ui hidden divider"></div>
                    <h4 class="ui horizontal divider section header teal">
                        Home Info
                    </h4> 
                    <div className="field">
                        <Field name="home_opened" component={this.renderDatePicker} label="Date Home Opened" placeholder="Date Home Opened" />
                    </div>                        
                    <div class="field"><button className="ui button">Submit Changes</button></div>
                </form>
            );
        } else if(selection === 1){
            return (
                <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    {/* <h4 className="ui dividing header">Documents</h4> */}
                    <div class="ui hidden divider"></div>
                    <div className="two fields">
                        <Field name="primary_first_name" component={this.renderInput} label="First Name" placeholder="First Name" />
                        <Field name="primary_last_name" component={this.renderInput} label="Last Name" placeholder="Last Name" />
                    </div>               
                    <div class="field"><button className="ui button">Submit Changes</button></div>
                </form>
            );
        } else if(selection === 2){
            return (
                <form onSubmit = {this.props.handleSubmit(this.onSubmit)} className="ui form error">
                    {/* <h4 className="ui dividing header">Documents</h4> */}
                    <div class="ui hidden divider"></div>
                    <div className="two fields">
                        <Field name="primary_first_name" component={this.renderInput} label="sdgsdg Name" placeholder="First Name" />
                        <Field name="primary_last_name" component={this.renderInput} label="Last Name" placeholder="Last Name" />
                    </div>             
                    <div class="field"><button className="ui button">Submit Changes</button></div>
                </form>
            );
        }
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
        console.log('this.props', this.props);
        console.log('this.props.initialValues', this.props.initialValues);
        return (

                <div className="ui container">
                    <div class="ui hidden divider"></div>
                    <h1 class="ui header">
                        <i class="home icon"></i>
                        <div class="content font--teal">
                            {this.props.home.home_name}
                            <h5 className="font--black">{`${this.props.home.primary_first_name} ${this.props.home.primary_last_name}`}{this.props.home.secondary_first_name ? ` & ${this.props.home.secondary_first_name}`  : ''}{this.props.home.secondary_last_name ? ` ${this.props.home.secondary_last_name}`  : ''}</h5>
                        </div>
                    </h1>
                    <div class="ui three item menu">
                        <a class={this.state.addClassGeneral} onClick={()=>this.toggleMenu(0)}>General Info</a>
                        <a class={this.state.addClassPersonalDocs} onClick={()=>this.toggleMenu(1)}>Personal Docs</a>
                        <a class={this.state.addClassHomeDocs} onClick={()=>this.toggleMenu(2)}>Home Docs</a>
                    </div>
                    <div class="ui hidden divider"></div>
                    <div class="ui very padded segment">
                        {this.renderSection(this.state.section)}
                    </div>
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

export default connect(mapStateToProps, { fetchHome, editHome })(formWrapped);

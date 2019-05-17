import React from 'react';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchHomes } from '../../actions';

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
                <select {...input} onChange={this.onChange} value={this.state.select} class="ui fluid search selection dropdown">
                    <option value = "">Choose Home</option>
                    {this.props.homes.map((home) => (
                        <option value = {home.id}>{ home.home_name }</option>                      
                    ))}
                </select>
                {this.renderError(meta)}
            </div>
        );
    };

    onChange = (event) => {
        this.setState({select: event.target.value});
    }

    render() {
        return (
            <div>
                <div class="ui hidden divider"></div>
                <div className = "ui two column centered grid">
                    <div className = "column">
                        <form className ="ui form error">
                            <Field name="homeSelected" component={this.renderSelect} label="Open Homes" />
                            <div className="field"><Link to= {`/homes/edit/${this.state.select}`} className="ui button">Edit Home</Link></div>
                        </form>
                    </div>
                </div>
            </div>
        );
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
import React from 'react';
import ReactDOM from 'react-dom';
import { Field, reduxForm } from 'redux-form';
import { Link } from 'react-router-dom'
import { connect } from 'react-redux';
import { fetchHomes } from '../../actions';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormControl from '@material-ui/core/FormControl';
import OutlinedInput from '@material-ui/core/OutlinedInput';
import Select from '@material-ui/core/Select';
import MenuItem from '@material-ui/core/MenuItem';
import InputLabel from '@material-ui/core/InputLabel';

const styles = theme => ({
    root: {
        display: 'flex',
        flexWrap: 'wrap',
    },
    formControl: {
        display: 'flex',
        margin: theme.spacing.unit,
    },
    dashboardContainer: {
        display: 'flex',
        margin: theme.spacing.unit,
        width: '200px',
        backgroundColor: 'yellow'
    },
    labelWidth: {
        labelWidth: 300
    },
});

class HomeList extends React.Component {
    state = {
        labelWidth: 0
    };

    componentDidMount() {
        this.props.fetchHomes();
        this.setState({
            labelWidth: ReactDOM.findDOMNode(this.InputLabelRef).offsetWidth,
        });
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

    renderSelect = ({ input, label, meta, className }) => {
        //const className = `field ${meta.error && meta.touched ? 'error' : ''}`;
        return (
            <div className = {className}>
                <InputLabel
                    ref={ref => {
                    this.InputLabelRef = ref;
                    }}
                    htmlFor="outlined-age-simple"
                >
                    {label}
                </InputLabel>
                <Select 
                    autoWidth="false"
                    onChange={this.onChange} 
                    value={this.state.select} 
                    variant="outlined"  
                    input={<OutlinedInput fullWidth="true" labelWidth={this.state.labelWidth} name="age" />}
                    {...input} 
                >
                    <MenuItem value = "" style={{minWidth: 200}}>Choose Home</MenuItem>
                    {this.props.homes.map((home) => (
                        <MenuItem value = {home.home_id}>{ home.home_name }</MenuItem>                      
                    ))}
                </Select>
                {/* {this.renderError(meta)} */}
            </div>
        );

        // return (
        //     <div className={className}>
        //         <label>{label}</label>
        //         <select {...input} onChange={this.onChange} value={this.state.select} class="ui fluid search selection dropdown">
        //             <option value = "">Choose Home</option>
        //             {this.props.homes.map((home) => (
        //                 <option value = {home.home_id}>{ home.home_name }</option>                      
        //             ))}
        //         </select>
        //         {this.renderError(meta)}
        //     </div>
        // );
    };

    onChange = (event) => {
        this.setState({select: event.target.value});
    }

    render() {
        const { classes } = this.props;

        return (
            // <div>
            //      <div class="ui hidden divider"></div>
            //     <div className = "ui two column centered grid">
            //         <div className = "column">
            //             <form className ="ui form error"> 
                    <div>
                        <FormControl variant="outlined" className={classes.formControl}>
                            <Field name="homeSelected" component={this.renderSelect} label="Open Homes" className = {classes.dashboardContainer}/>
                                {/* <MenuItem value="ff0000" primaryText="Red" />
                                <MenuItem value="00ff00" primaryText="Green" />
                                <MenuItem value="0000ff" primaryText="Blue" />   */}

                        </FormControl>
                    </div>
            //                   <Field name="homeSelected" component={this.renderSelect} label="Open Homes" /> */}
            //                 <div className="field"><Link to= {`/homes/edit/${this.state.select}`} className="ui button">Edit Home</Link></div>
            //             </form>
            //         </div>
            //     </div>
            // </div>
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

HomeList.propTypes = {
    classes: PropTypes.object.isRequired,
};

const formWrapped = reduxForm({ 
    form: 'homeList', 
    touchOnBlur : false, 
    validate: validate
})(HomeList);

export default connect(mapStateToProps, { fetchHomes })(withStyles(styles)(formWrapped));
import React, { Component, Fragment } from 'react';
import { asyncComponent } from 'react-async-component';
import ContactForm from './ContactForm';
import NewHome from './NewHome';
import axios from 'axios';
import { connect } from 'react-redux';
import { fetchHomes } from '../actions';

/** We are importing our index.php my app Vairaible */
import myApp from 'myApp';

/* globals __webpack_public_path__ */
__webpack_public_path__ = `${window.STATIC_URL}/app/assets/bundle/`;

/* class Myapp extends Component {
    render() {

        const { user : { name, email }, logged } = myApp;

        return (
            <Fragment>
                <div className="dashboard">
                    {logged &&
                        <h2 className="status">Logged In</h2>
                    }
                    <h1 className="name"> {name}</h1>
                    <p className="email">{email}</p>

                    <p>API host variable {__API_HOST__}</p>
                </div>
            </Fragment>
        )
    }
} */

class Myapp extends Component {
/*     state = {
        contacts: [],
        homes: []
    } */

    componentDidMount() {
        this.props.fetchHomes();


        //const url = '/api/contacts.php';
        /* axios.get('./../api/contacts.php')
        .then(response => response.data)
        .then((data) => {
            this.setState({ contacts: data });
        }); */
    }

    render() {
        console.log('this.props', this.props);
        return (
            <React.Fragment>
                {/* <h1>Homes</h1>
                <table border='1' width='100%' >
                <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Country</th>
                    <th>City</th>
                    <th>Job</th>     
                </tr>
                {this.state.contacts.map((contact) => (
                <tr>
                    <td>{ contact.name }</td>
                    <td>{ contact.email }</td>
                    <td>{ contact.country }</td>
                    <td>{ contact.city }</td>
                    <td>{ contact.job }</td>
                </tr>
                ))}
                </table>
                <ContactForm /> */}


                <div>
                    <div className="ui menu">
                        <div className="header item">
                            M*System
                        </div>
                        <div className="item active">
                            Homes
                        </div>
                    </div>

                    <select className="ui search dropdown">
                        {this.props.homes.map((home) => (
                            <option value = "home.id">{ home.home_name }</option>                      
                        ))}
                    </select>

                    <div className="ui container centered grid">
                        <div className="ui row">
                            <div className="column">
                                HOMES
                                <NewHome /> 
                            </div>
                        </div>
                    </div>
                </div>
            </React.Fragment>
        );
    }
}

const mapStateToProps = state => {
    return { homes: state.homes };
  };

//export default Myapp;

export default connect(
    mapStateToProps,
    {fetchHomes: fetchHomes}
  )(Myapp);
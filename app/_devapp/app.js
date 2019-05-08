import React, { Component, Fragment } from 'react';
import { render } from 'react-dom';
import { asyncComponent } from 'react-async-component';
import ContactForm from './components/ContactForm';
import axios from 'axios';

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
    state = {
        contacts: []
    }

    componentDidMount() {
        //const url = '/api/contacts.php';
        axios.get('./../api/contacts.php')
        .then(response => response.data)
        .then((data) => {
            this.setState({ contacts: data });
        });
    }

    render() {
        return (
            <React.Fragment>
                <h1>Homes</h1>
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
                <ContactForm />
            </React.Fragment>
        );
    }
}

render(<Myapp/>, document.getElementById('app'));
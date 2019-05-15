import React from 'react';
import axios from 'axios';

class ContactForm extends React.Component {
    state = {
        name: '',
        email: '',
        country: '',
        city: '',
        job: '',

    }

    handleFormSubmit( event ) {
        event.preventDefault();

        let formData = new FormData();
        formData.append('name', this.state.name)
        formData.append('email', this.state.email)
        formData.append('city', this.state.city)
        formData.append('country', this.state.country)
        formData.append('job', this.state.job)
        console.log('formData2', formData);
        axios({
            method: 'post',
            url: './../../api/contacts.php',
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
    }

    render(){
        return (
        <form>
            <label>Name</label>
            <input type="text" name="name" value={this.state.name}
                onChange={e => this.setState({ name: e.target.value })}/>

            <label>Email</label>
            <input type="email" name="email" value={this.state.email}
                onChange={e => this.setState({ email: e.target.value })}/>

            <label>Country</label>
            <input type="text" name="country" value={this.state.country}
                onChange={e => this.setState({ country: e.target.value })}/>

            <label>City</label>
            <input type="text" name="city" value={this.state.city}
                onChange={e => this.setState({ city: e.target.value })}/>

            <label>Job</label>
            <input type="text" name="job" value={this.state.job}
                onChange={e => this.setState({ job: e.target.value })}/>

            <input type="submit" onClick={e => this.handleFormSubmit(e)} value="Create Contact" />
        </form>);
    }
}

export default ContactForm;
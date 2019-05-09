import React from 'react';
import { connect } from 'react-redux';
import { createHome } from '../../actions';
import HomeInitialForm from './HomeInitialForm';

class HomeCreate extends React.Component {
  onSubmit = formValues => {
    this.props.createHome(formValues);
  };

  render() {
    return (
      <div>
        <h3>Create a Home</h3>
            <HomeInitialForm onSubmit={this.onSubmit} /> 
      </div>
    );
  }
}

export default connect(
  null,
  { createHome }
)(HomeCreate);
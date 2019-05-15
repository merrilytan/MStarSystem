import React, { Component, Fragment } from 'react';
import { connect } from 'react-redux';
import { fetchHomes } from '../actions';
import HomeCreate from './homes/HomeCreate';

class Myapp extends Component {

    componentDidMount() {
        this.props.fetchHomes();
    }

    render() {
        console.log('this.props', this.props);
        return (
            <React.Fragment>
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
                            <option value = {home.id}>{ home.home_name }</option>         
                        ))}
                    </select>

                    <div className="ui container centered grid">
                        <div className="ui row">
                            <div className="column">
                                HOMES
                                <HomeCreate /> 
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
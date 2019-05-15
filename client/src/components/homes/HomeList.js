import React from 'react';
import { connect } from 'react-redux';
import { fetchHomes } from '../../actions';

class HomeList extends React.Component {
    componentDidMount() {
        this.props.fetchHomes();
    }
    render() {
        return (
            <select className="ui search dropdown">
                {this.props.homes.map((home) => (
                    <option value = "home.id">{ home.home_name }</option>                      
                ))}
            </select>
        );
    }
}

const mapStateToProps = (state) => {
    return { homes: Object.values(state.homes)};
};

export default connect(mapStateToProps, { fetchHomes })(HomeList);
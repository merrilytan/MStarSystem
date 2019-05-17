import _ from 'lodash';
import {
    FETCH_HOME,
    EDIT_HOME
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_HOME:
            return action.payload;
        case EDIT_HOME:
            return action.payload;
        default: 
            return state;
    }
};
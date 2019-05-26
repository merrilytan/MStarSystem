import _ from 'lodash';
import {
    FETCH_HOMES,
    CREATE_HOME
} from '../actions/types';

export default (state = {}, action) => {
    switch (action.type) {
        case FETCH_HOMES:
            return { ...state, ..._.mapKeys(action.payload, 'home_id') };
        case CREATE_HOME:
            return { ...state, [action.payload.home_id]: action.payload };
        default: 
            return state;
    }
};
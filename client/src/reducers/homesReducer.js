import _ from 'lodash';
import {
    FETCH_HOMES,
    CREATE_HOME
} from '../actions/types';

export default (state = {}, action) => {
    console.log('action.payload', action.payload);
    switch (action.type) {
        case FETCH_HOMES:
            return { ...state, ..._.mapKeys(action.payload, 'id') };
        // case FETCH_HOME:
        //     return { ...state, [action.payload.id]: action.payload };
        case CREATE_HOME:
            return { ...state, [action.payload.id]: action.payload };
        default: 
            return state;
    }
};
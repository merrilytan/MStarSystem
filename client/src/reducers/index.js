import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
//Redux form creates reducers for us!
import homeReducer from './homeReducer.js';

/* const songsReducer = () => {
  return [
    { title: 'No Scrubs', duration: '4:05' },
    { title: 'Macarena', duration: '2:30' },
    { title: 'All Star', duration: '3:15' },
    { title: 'I Want it That Way', duration: '1:45' }
  ];
};*/

// const homesReducer = (state = [], action) => {
//     switch (action.type) {
//         case 'FETCH_HOMES':
//             return action.payload;
// /*         case 'CREATE_HOME':
//             return null; */
//         default: 
//             return state;
//     }
// };

export default combineReducers({
  form: formReducer, //hooking up redux form
  homes: homeReducer
});
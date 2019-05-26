import { combineReducers } from 'redux';
import { reducer as formReducer } from 'redux-form';
import homesReducer from './homesReducer.js';
import homeReducer from './homeReducer.js';

export default combineReducers({
  form: formReducer,
  homes: homesReducer,
  home: homeReducer
});
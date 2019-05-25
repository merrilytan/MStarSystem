import homes from '../apis/homes';
import { CREATE_HOME, FETCH_HOMES, FETCH_HOME, EDIT_HOME } from './types';

export const fetchHomes = () => {
    return async (dispatch, getState) => {
        const response = await homes.get('/homeData');
        console.log('response', response);
        dispatch({ type: FETCH_HOMES, payload: response.data });
    };
};  

export const fetchHome = (selectedHome) => {
    return async (dispatch, getState) => {
        const response = await homes.get(`/homeData/${selectedHome}`);
        dispatch({ type: FETCH_HOME, payload: response.data });
    }
};  

export const createHome = (formValues) => {
    return async (dispatch, getState) => {

        const home_name_capitalized = formValues.home_name.charAt(0).toUpperCase() + formValues.home_name.slice(1);
        const primary_first_name_capitalized = formValues.primary_first_name.charAt(0).toUpperCase() + formValues.primary_first_name.slice(1);
        const primary_last_name_capitalized = formValues.primary_last_name.charAt(0).toUpperCase() + formValues.primary_last_name.slice(1);

        let formData = new FormData();
        formData.append('home_name', home_name_capitalized);
        formData.append('primary_first_name', primary_first_name_capitalized);
        formData.append('primary_last_name', primary_last_name_capitalized);
        const response = await homes.post('/homeData', formData);

        dispatch({ type: CREATE_HOME, payload: response.data });
    };
};

export const editHome = (selectedHome, formValues) => {
    return async (dispatch, getState) => {

        const entries = Object.entries(formValues);
        let formData = new FormData();

        entries.forEach((val) => {
            if (val[1] == "" ){
                val[1] = null;
            }
            formData.append(val[0], val[1]);
        });

        const response = await homes.post(`/homeData/${selectedHome}`, formData);
        dispatch({ type: EDIT_HOME, payload: response.data });
    }
}; 

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

        let formData = new FormData();
        formData.append('home_name', formValues.home_name);
        formData.append('primary_first_name', formValues.primary_first_name);
        formData.append('primary_last_name', formValues.primary_last_name);
        const response = await homes.post('/homeData', formData);

        dispatch({ type: CREATE_HOME, payload: response.data });
    };
};

export const editHome = (selectedHome, formValues) => {
    return async (dispatch, getState) => {
        const entries = Object.entries(formValues);
        let formData = new FormData();

        entries.forEach((val) => {
            formData.append(val[0], val[1]);
        });
        
        const response = await homes.post(`/homeData/${selectedHome}`, formData);
        dispatch({ type: EDIT_HOME, payload: response.data });
    }
}; 

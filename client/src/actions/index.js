import homes from '../apis/homes';
import { CREATE_HOME, FETCH_HOMES, FETCH_HOME } from './types';

export const fetchHomes = () => {
    return async (dispatch, getState) => {
        const response = await homes.get('/homeData');
        console.log('response', response);
        dispatch({ type: FETCH_HOMES, payload: response.data });
    };
};  

export const createHome = (formValues) => {
    return async (dispatch, getState) => {

        let formData = new FormData();
        formData.append('home_name', formValues.home_name);
        formData.append('primary_first_name', formValues.primary_first_name);
        formData.append('primary_last_name', formValues.primary_last_name);

        const response = await homes.post('/homeData', formData);

        dispatch({ type: CREATE_HOME, payload: response.data });
        // await homes({
        //     method: 'post',
        //     url: './../../api/homes.php',
        //     data: formData,
        //     config: { headers: {'Content-Type': 'multipart/form-data' }}
        // })
        // .then(function (response) {
        //     //handle success
        //     console.log('response!', response);
        //     dispatch({ type: CREATE_HOME, payload: response.data });
        // })
        // .catch(function (error) {
        //     //handle error
        //     console.log(error);
        // });
    
        //dispatch({ type: 'CREATE_HOME'});
    };
};

export const editHome = (selectedHome) => {
    return async (dispatch, getState) => {
        const response = await homes.get(`/homeData/${selectedHome}`);
        console.log('response11111', response);
        dispatch({ type: FETCH_HOME, payload: response.data });
    }
};   


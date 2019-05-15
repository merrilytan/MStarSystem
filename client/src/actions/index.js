import homes from '../apis/homes';
import { CREATE_HOME, FETCH_HOMES } from './types';

export const fetchHomes = () => {
    return async (dispatch, getState) => {
        const response = await homes.get();
        console.log('response.data', response.data);
        dispatch({ type: FETCH_HOMES, payload: response.data });
    };
};  

export const createHome = (formValues) => {
    return async (dispatch, getState) => {
        //const response = await homes.post('/streams', { ...formValues, userId });

        let formData = new FormData();
        formData.append('home_name', formValues.homeName);
        formData.append('primary_first_name', formValues.primaryFirstName);
        formData.append('primary_last_name', formValues.primaryLastName);

        await homes({
            method: 'post',
            url: './../../api/homes.php',
            data: formData,
            config: { headers: {'Content-Type': 'multipart/form-data' }}
        })
        .then(function (response) {
            //handle success
            console.log('response!', response);
            dispatch({ type: CREATE_HOME, payload: response.data });
        })
        .catch(function (error) {
            //handle error
            console.log(error);
        });
    
        //dispatch({ type: 'CREATE_HOME'});
    };
};


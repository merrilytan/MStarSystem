import axios from 'axios';

export default axios.create({
    //baseURL:$ './../../api/homes.php'
    baseURL: window.location.origin
});
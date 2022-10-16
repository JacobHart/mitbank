import axios from 'axios';
import setAuthToken from '../../utils/setAuthToken';
import { authError, userLoaded } from './authSlice'

export const loadUser = () => async dispatch => {

    if(localStorage.token) {
        setAuthToken(localStorage.token);
    }


    try {
        const res = await axios.get('/api/auth');
        dispatch(userLoaded(res.data));
    } catch (err) {
        dispatch(authError());
    }
}


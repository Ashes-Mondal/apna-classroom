import axios from './config';

export const fetchUserDetails = async () => {
    console.log('fetching user data.....');
    const url = '/getUserInfo'
    try {
        const res = await axios.post(url);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: 'Not Connected to server' };
    }
}
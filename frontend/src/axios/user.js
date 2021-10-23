import axios from './config';

export const fetchUserDetails = async () => {
    const url = '/getUserInfo'
    try {
        const res = await axios.post(url);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: 'Not Connected to server' };
    }
}
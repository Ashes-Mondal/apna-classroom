import axios from './config';

export const handleLogin = async (data) => {
    // console.log(data);
    const url = '/login'
    try {
        const res = await axios.post(url, data);
        console.log('handleLogin_res:',res.data);
        return res.data.accessToken;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: 'Not Connected to server' };
    }
}

export const handleRegister = async (data) => {
    console.log(data);
    const url = '/register'
    try {
        const res = await axios.post(url, data);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: 'Not Connected to server' };
    }
}

export const handleLogout = async (data) => {
    console.log(data);
    const url = '/logout'
    try {
        const res = await axios.post(url, data);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: 'Not Connected to server' };
    }
}
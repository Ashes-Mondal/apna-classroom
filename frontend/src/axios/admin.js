import axios from "./config";

export const getUserList = async (data) => {
    const url = `/getUserList?role=${data.role}&batchCode=${data.batchCode}`;
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};

export const register = async (data) => {
    const url = `/register`;
    try {
        const res = await axios.post(url, data);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};

export const disable = async (data) => {
    const url = `/disable`;
    try {
        const res = await axios.post(url, data);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};
import axios from "./config";

export const createClassroom = async (data) => {
    const url = "/createClassroom";
    try {
        const res = await axios.post(url, data);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};

export const getPostFeed = async (data) => {
    const url = `/getPostFeed?classID=${data}`;
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};

export const postAssignment = async (data) => {
    const url = "/postAssignment";
    try {
        const res = await axios.post(url, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};

export const postAnnouncement = async (data) => {
    const url = "/postAnnouncement";
    try {
        const res = await axios.post(url, data, {
            headers: {
                "Content-Type": "multipart/form-data",
            },
        });
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};

export const getUpcomingAssignments = async (classroomID) => {
    const url = `/getUpcomingAssignments?classID=${classroomID}`;
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};

export const getUserClassAssignments = async (data) => {
    const url = `/getUserClassAssignments?classID=${data.classroomID}&id=${data.id}`;
    try {
        const res = await axios.get(url);
        return res.data;
    } catch (error) {
        throw error.response ? error.response.data : { data: null, error: "Not Connected to server" };
    }
};

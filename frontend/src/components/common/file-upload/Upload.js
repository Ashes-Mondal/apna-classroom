import React, { useState } from 'react'
import { uploadFile } from '../../../axios/file';
import './Upload.scss'

const Upload = () => {
    const [selectedFile, setselectedFile] = useState(undefined);
    const handleSubmit = async (e) => {
        e.preventDefault();
        //Step1:check if file is selected
        if (selectedFile === undefined) {
            alert('No file is selected!')
            return;
        }

        //Step2:make form data
        const data = new FormData();
        data.append('file', selectedFile);

        //Step3:Send to backend server
        try {
            const res = await uploadFile(data);
            console.log("Files Details:",res.data)
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="file" id="file" onChange={e => setselectedFile(e.target.files[0])} />
            <button onSubmit={handleSubmit}>Submit</button>
        </form>
    )
}

export default Upload

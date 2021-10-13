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
        data.append('file', selectedFile)
        data.append('name', 'Ashes')
        // for (let i = 0; i < selectedFile.length; i++) {
        //     data.append(`files[${i}]`, selectedFile[i])
        // }
        console.log("selectedFile:",selectedFile);

        //Step3:Send to backend server
        try {
            const res = await uploadFile(data);
            console.log("Files Details:", res)
        } catch (error) {
            alert('Failed');
            console.error(error);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="file" id="file" onChange={e => setselectedFile(e.target.files[0])} />
            <button type='submit' onSubmit={handleSubmit}>Submit</button>
        </form>
    )
}

export default Upload

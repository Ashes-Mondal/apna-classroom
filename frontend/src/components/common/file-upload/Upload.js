import React, { useState } from 'react'
import { uploadFile } from '../../../axios/file';
import './Upload.scss'

const Upload = () => {
    const [selectedFile,setselectedFile] = useState('');
    const handleSubmit = async(e)=>{
        e.preventDefault();
        const data = new FormData();
        data.append('file',selectedFile);
        try {
            const res = await uploadFile(data);
            console.warn(res);
        } catch (error) {
            console.error(error);
        }
    }
    return (
        <form onSubmit={handleSubmit}>
            <input type="file" id="file" onChange={e=>setselectedFile(e.target.files[0])}/>
        </form>
    )
}

export default Upload

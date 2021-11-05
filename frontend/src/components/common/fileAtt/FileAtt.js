import "./FileAtt.scss";
import React, { useEffect } from "react";
import { FaPaperclip } from "react-icons/fa";

function FileAtt({ fileData }) {
    console.log(fileData);
    const originalname = fileData.metadata ? fileData.metadata.originalname : fileData;
    const namesplit = originalname.split(".");
    const ext = namesplit[namesplit.length - 1];
    return (
        <a
            onClick={(e) => {
                e.stopPropagation();
            }}
            className="file-att"
            href={fileData._id ? `http://localhost:8000/api/files/download?id=${fileData._id}` : null}
            download
        >
            <div className="icon">
                <FaPaperclip />
            </div>
            <div className="file-details">
                <h5>{originalname}</h5>
                <h6>{ext.toUpperCase()}</h6>
            </div>
        </a>
    );
}

export default FileAtt;

import "./FileAtt.scss";
import React from "react";
import { FaPaperclip } from "react-icons/fa";

function FileAtt({ fileData }) {
    const originalname = fileData.metadata.originalname;
    const namesplit = originalname.split(".");
    const ext = namesplit[namesplit.length - 1];
    return (
        <div className="file-att">
            <div className="icon">
                <FaPaperclip />
            </div>
            <div className="file-details">
                <h5>{originalname}</h5>
                <h6>{ext.toUpperCase()}</h6>
            </div>
        </div>
    );
}

export default FileAtt;

import './FileAtt.scss'
import React from 'react'
import { FaPaperclip } from 'react-icons/fa'

function FileAtt() {
    return (
        <div className="file-att">
            <div className="icon">
                <FaPaperclip />
            </div>
            <div className="file-details">
                <h5>myfile.pdf</h5>
                <h6>DOCUMENT</h6>
            </div>
        </div>
    )
}

export default FileAtt

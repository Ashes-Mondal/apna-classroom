import React from "react";
import { FaPaperclip } from "react-icons/fa";
import { getDate } from "../../../helper";
import Send from "./Send";
import { RiUploadCloudFill } from "react-icons/ri";
import FileAtt from "../../common/fileAtt/FileAtt";

function Submission({ assignment, theme }) {
    return (
        <div className="asg-container1">
            <h4>Not Submitted</h4>
            <h5>
                Submit By <span className={`asg-theme font-${theme}`}>{getDate(assignment.dueDate)}</span>
            </h5>
            <br />
            <h5>Attachments:</h5>
            <div className="asg-attachments">
                <div className="attachments attach-submit">
                    {assignment.fileIDs
                        ? assignment.fileIDs.map((file, key) => {
                              return <FileAtt key={key} fileData={file} />;
                          })
                        : null}
                </div>
            </div>
            <div className="attachment-component-type1 ">
                <RiUploadCloudFill className="upload-icon-attachment" /> Add Attachment
            </div>
            <div className="attachment-component-type1 bold">
                SUBMIT <Send className="submit-btn-theme" />
            </div>
        </div>
    );
}

export default Submission;

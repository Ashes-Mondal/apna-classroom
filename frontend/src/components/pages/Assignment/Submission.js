import React, { useEffect, useState } from "react";
import { getDate } from "../../../helper";
import { RiUploadCloudFill } from "react-icons/ri";
import FileAtt from "../../common/fileAtt/FileAtt";
import { IoSendSharp } from "react-icons/io5";
import { getSubmission, postSubmission } from "../../../axios/submission";

function Submission({ assignment, theme }) {
    const [selectedFiles, setSelectedFiles] = useState([]);
    const [submissionDate, setSubmissionDate] = useState();
    const fileUploadHandler = () => {
        document.querySelector("#asg-submit-input").click();
    };
    const handleSubmit = (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append("assignmentID", assignment._id);
        data.append("classroomID", assignment.classroomID);
        if (selectedFiles) {
            for (let i = 0; i < selectedFiles.length; i++) {
                data.append(`file`, selectedFiles[i]);
            }
        }
        postSubmission(data)
            .then((res) => {
                console.log("res", res);
                setSubmissionDate(res.data.submissionDate);
            })
            .catch((e) => {
                console.error(e);
            });
    };
    useEffect(() => {
        if (assignment?._id) {
            console.log("asggg:", assignment);
            getSubmission({ classroomID: assignment.classroomID, assignmentID: assignment._id })
                .then((res) => {
                    console.log("submission:", res.data);
                    setSelectedFiles(res.data.fileIDs);
                })
                .catch((e) => {
                    console.error(e);
                });
        }
        return;
    }, [assignment]);
    return (
        <>
            {assignment ? (
                <div className="asg-container1">
                    <h4> {!submissionDate ? "Not Submitted" : "Submitted"}</h4>
                    <h5>
                        Submit By <span className={`asg-theme font-${theme}`}>{getDate(assignment.dueDate)}</span>
                    </h5>
                    <br />
                    <h5>Attachments:</h5>
                    <div>
                        <div className="selected-files">
                            {!selectedFiles.length
                                ? selectedFiles.map((file, key) => {
                                      return <FileAtt fileData={file.name} key={key} />;
                                  })
                                : null}
                        </div>
                    </div>
                    {!submissionDate ? (
                        <>
                            <div className="attachment-component-type1 " onClick={fileUploadHandler}>
                                Add Attachment <RiUploadCloudFill className="upload-icon-attachment" />
                                <input type="file" multiple id="asg-submit-input" onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))}></input>
                            </div>

                            <div className="attachment-component-type1 " onClick={handleSubmit}>
                                SUBMIT <IoSendSharp className="submit-btn-theme" />
                            </div>
                        </>
                    ) : null}
                </div>
            ) : null}
        </>
    );
}

export default Submission;

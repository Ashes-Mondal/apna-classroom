import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { GrFormClose } from "react-icons/gr";
import { useSelector } from "react-redux";
import { postAnnouncement, postAssignment } from "../../../../axios/classroom";
import "./PostForm.scss";
import FileAtt from "../../../common/fileAtt/FileAtt";
import { AiOutlineCloudUpload } from "react-icons/ai";

const FileShow = ({ file }) => {
    console.log("showing file", file);
    return <h5>{file.name}</h5>;
};

const PostForm = ({ setShowForm, formType, classroomID, theme }) => {
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [maxMarks, setMaxMarks] = useState("");
    const [selectedFiles, setSelectedFiles] = useState([]);

    const user = useSelector((state) => state.user);

    const closeOnOverlayClick = (e) => {
        if (e.target.classList[0] === "overlay") {
            // console.log("overlay click");
            setShowForm(false);
        }
        if (e.target.classList[0] === "post-form") {
            // console.log("form click");
        }
    };

    const fileUploadHandler = () => {
        document.querySelector("#files").click();
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const data = new FormData();
        let formData = {
            title,
            body,
        };
        if (formType === "asg") {
            formData.dueDate = dueDate;
            formData.maxMarks = maxMarks;
            formData.facultyID = user._id;
        } else {
            formData.userID = user._id;
        }
        data.append("formData", JSON.stringify(formData));
        data.append("classroomID", classroomID);
        if (selectedFiles) {
            for (let i = 0; i < selectedFiles.length; i++) {
                data.append(`file`, selectedFiles[i]);
            }
        }
        if (formType === "asg") {
            postAssignment(data)
                .then((resp) => {
                    // console.log(resp);
                    const redirectURL = `/class/${classroomID}/asg/${resp.data}`;
                    history.push(redirectURL);
                    return;
                })
                .catch((e) => {
                    console.log(e);
                });
        } else {
            postAnnouncement(data)
                .then((resp) => {
                    console.log(resp);
                    setShowForm(false);
                    return;
                })
                .catch((e) => {
                    console.log(e);
                });
        }
    };
    return (
        <>
            <div className="overlay" onClick={closeOnOverlayClick}>
                <form className="post-form" onSubmit={handleSubmit}>
                    <h2>Post An {formType === "asg" ? "Assignment" : "Announcement"}</h2>
                    <div className="form-input">
                        {title.length ? <h6>TITLE</h6> : null}
                        <input required type="text" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                    </div>
                    {formType === "asg" ? (
                        <>
                            <div className="form-input">
                                <h6>DUE DATE / TIME</h6>
                                <input required type="datetime-local" placeholder="Due Date" onChange={(e) => setDueDate(e.target.value)} />
                            </div>
                            <div className="form-input">
                                {maxMarks.length ? <h6>MAX MARKS</h6> : null}
                                <input required min="0" type="number" placeholder="Max Marks" onChange={(e) => setMaxMarks(e.target.value)} />
                            </div>
                        </>
                    ) : null}
                    <div className="form-input">
                        {body.length ? <h6>DESCRIPTION</h6> : null}
                        <textarea placeholder="Description..." rows={6} onChange={(e) => setBody(e.target.value)} />
                    </div>
                    <div className="">
                        <div className="selected-files">
                            {console.log("sel", selectedFiles)}
                            {selectedFiles.map((file, key) => {
                                // console.log("file rendered", file);
                                return <FileAtt fileData={file.name} key={key} />;
                            })}
                        </div>
                    </div>
                    <div className="form-input file-input" onClick={fileUploadHandler}>
                        <h6>ATTACH FILES</h6>
                        <div className="file-upload-icon">
                            <AiOutlineCloudUpload />
                        </div>
                        <input type="file" placeholder="Attach A File" multiple="multiple" id="files" onChange={(e) => setSelectedFiles(Array.from(e.target.files || []))} />
                    </div>

                    <button className={`bg-${theme}`} onSubmit={handleSubmit}>
                        Post {formType === "asg" ? "Assignment" : "Announcement"}
                    </button>
                    <div className="formclose-btn">
                        <GrFormClose onClick={() => setShowForm(false)} />
                    </div>
                </form>
            </div>
        </>
    );
};

export default PostForm;

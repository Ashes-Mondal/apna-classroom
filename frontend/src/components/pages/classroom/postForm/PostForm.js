import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { GrFormClose } from "react-icons/gr";
import { useSelector } from "react-redux";
import {postAssignment } from "../../../../axios/classroom";
import "./PostForm.scss";

const PostForm = ({ setShowForm, formType, classroomID }) => {
    const history = useHistory();
    const [title, setTitle] = useState("");
    const [body, setBody] = useState("");
    const [dueDate, setDueDate] = useState("");
    const [maxMarks, setMaxMarks] = useState("");
    const [selectedFiles, setSelectedFiles] = useState();

    const user = useSelector((state) => state.user);

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
            //postAnnouncement
        }
    };
    return (
        <>
            <div className="overlay">
                <form className="post-form" onSubmit={handleSubmit}>
                    <h2>
                        Post An{" "}
                        {formType === "asg" ? "Assignment" : "Announcement"}
                    </h2>
                    <div className="form-input">
                        {title.length ? <h6>TITLE</h6> : null}
                        <input
                            required
                            type="text"
                            placeholder="Title"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                    </div>
                    {formType === "asg" ? (
                        <>
                            <div className="form-input">
                                <h6>DUE DATE / TIME</h6>
                                <input
                                    required
                                    type="datetime-local"
                                    placeholder="Due Date"
                                    onChange={(e) => setDueDate(e.target.value)}
                                />
                            </div>
                            <div className="form-input">
                                {maxMarks.length ? <h6>MAX MARKS</h6> : null}
                                <input
                                    required
                                    min="0"
                                    type="number"
                                    placeholder="Max Marks"
                                    onChange={(e) =>
                                        setMaxMarks(e.target.value)
                                    }
                                />
                            </div>
                        </>
                    ) : null}
                    <div className="form-input">
                        {body.length ? <h6>DESCRIPTION</h6> : null}
                        <textarea
                            placeholder="Description..."
                            rows={6}
                            onChange={(e) => setBody(e.target.value)}
                        />
                    </div>
                    <div className="form-input file-input">
                        <h6>ATTACH FILE</h6>
                        <input
                            type="file"
                            placeholder="Attach A File"
                            multiple="multiple"
                            id="files"
                            onChange={(e) => setSelectedFiles(e.target.files)}
                        />
                    </div>
                    <button onSubmit={handleSubmit}>
                        Post{" "}
                        {formType === "asg" ? "Assignment" : "Announcement"}
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

import React from "react";
import PostForm from "../postForm/PostForm";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./AddAsgModal.scss";

function AddAsgModal({ classroomID, theme }) {
    const [showForm, setShowForm] = useState(false);
    const user = useSelector((state) => state.user);
    return (
        <>
            {user.role !== "student" ? (
                <div>
                    {showForm ? <PostForm classroomID={classroomID} setShowForm={setShowForm} formType="asg" theme={theme} /> : null}
                    <div onClick={() => setShowForm(true)} className="add-asg-cta">
                        <h5>Post Assignment</h5>
                    </div>
                </div>
            ) : null}
        </>
    );
}

export default AddAsgModal;

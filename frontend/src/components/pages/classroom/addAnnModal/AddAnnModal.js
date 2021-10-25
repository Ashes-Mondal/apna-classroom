import React from "react";
import PostForm from "../postForm/PostForm";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./AddAnnModal.scss";

function AddAnnModal({ classroomID }) {
    const [showForm, setShowForm] = useState(false);
    const user = useSelector((state) => state.user);
    return (
        <>
            {showForm ? (
                <PostForm
                    classroomID={classroomID}
                    setShowForm={setShowForm}
                    formType="ann"
                />
            ) : null}
            <div onClick={() => setShowForm(true)} className="add-ann-cta">
                <h5>Post Announcement</h5>
            </div>
        </>
    );
}

export default AddAnnModal;

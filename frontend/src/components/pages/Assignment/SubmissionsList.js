import React from "react";

function SubmissionsList({ assignment, theme, setShowSubmissions }) {
    return (
        <div className="container">
            <div className="asg-toprow">
                <h2>{assignment.title}</h2>
                <span className={`showsubmissions-btn bg-${theme}`} onClick={() => setShowSubmissions(false)}>
                    show assignment
                </span>
            </div>
        </div>
    );
}

export default SubmissionsList;

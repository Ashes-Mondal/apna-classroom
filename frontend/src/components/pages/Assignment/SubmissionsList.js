import React from "react";
import { MdKeyboardArrowDown } from "react-icons/md";

function SubmissionsList({ assignment, theme, setShowSubmissions }) {
    const submissions = [...Array(100).keys()];
    return (
        <div className="submissions-list-container">
            <div className="asg-toprow">
                <h2>{assignment.title}</h2>
                <span className={`showsubmissions-btn bg-${theme}`} onClick={() => setShowSubmissions(false)}>
                    show assignment
                </span>
            </div>
            <br />
            <div className="asg-secondrow">
                <span className="asg-secondrow1">
                    <h4>Class Submissions</h4>
                    <span className={`asg-filter-btn bg-${theme}`}>
                        Filter
                        <MdKeyboardArrowDown />
                    </span>
                </span>
                <h4>Total Submissions: 69/120</h4>
            </div>
            <div className="submissions-list">
                {submissions.map(() => (
                    <span className="submission-item">
                        <span className="submission-item-name">Aaryak Shah </span>
                        <span className="submission-item-pipeline">|</span>
                        <span className={`submission-item-rollno font-${theme} bold `}> 2019IMT-001 </span>
                        <span className="submission-item-marks">__/20</span>
                        <span className={`submission-item-attachments font-${theme} bold`}>Attachments: 3 </span>
                    </span>
                ))}
            </div>
        </div>
    );
}

export default SubmissionsList;

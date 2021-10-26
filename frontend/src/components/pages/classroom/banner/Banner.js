import React from "react";
import { FaVideo, FaClipboard } from "react-icons/fa";
import { useHistory } from "react-router";
import "./Banner.scss";

function launchMeeting() {}

function Banner({ currentClassroom }) {
    const history = useHistory();
    return (
        <div className={`banner bg-${currentClassroom.theme}`}>
            <div className="info">
                <h1>{currentClassroom.subjectName}</h1>
                <h3>
                    Semester {currentClassroom.semester} | {currentClassroom.batchCode}
                </h3>
            </div>
            <div className="actions">
                <button onClick={() => history.push(`/class/${currentClassroom._id}/meet/${currentClassroom.meetingID}`)}>
                    <FaVideo /> Meeting
                </button>
                <button onClick={() => history.push(`/class/${currentClassroom._id}/results`)}>
                    <FaClipboard /> Results
                </button>
            </div>
        </div>
    );
}

export default Banner;

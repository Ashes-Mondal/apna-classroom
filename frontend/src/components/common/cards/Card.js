import React from "react";
import "./Card.scss";
import { SiGooglehangoutsmeet } from "react-icons/si";
import { HiOutlineClipboardList } from "react-icons/hi";
import { useHistory } from "react-router";
import ThreeDots from "./ThreeDots";


const Card = (props) => {
    const history = useHistory();
    const { details } = props;

    return (
        <div className={`card subject-card bg-${details.theme}`}>
            <div className="card-body">
                <div className="subject-body" onClick={() => history.push(`/class/${details._id}`)}>
                    <h5 className={`card-title subject-name font-${details.theme}`}>{details.subjectName}</h5>
                    <h6 id="subject-description">{`${details.batchCode} | Semester ${details.semester} `}</h6>
                    <h6 id="subject-faculty">{details.facultyName}</h6>
                </div>
                <span className="three-dots">
                    <ThreeDots details={details} />
                </span>
            </div>
            <div className="card-bottom">
                <span onClick={() => history.push(`/class/${details._id}/todos`)}>
                    <HiOutlineClipboardList /> Todo
                </span>
                <span onClick={() => history.push(`/class/${details._id}/meet/${details.meetingID}`)}>
                    <SiGooglehangoutsmeet /> Meeting
                </span>
            </div>
        </div>
    );
};

export default Card;

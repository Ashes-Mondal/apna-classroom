import React from "react";
import { useHistory } from "react-router";

const getDate = (givenDate) => {
    const date = new Date(givenDate);
    const d = date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", hour12: true, hour: "2-digit", minute: "2-digit" }).split(",");
    const finalDate = d[0] + d[1].toUpperCase();
    return finalDate;
};
const ToDo = ({ activity, ...props }) => {
    const history = useHistory();
    return (
        <div style={{ cursor: "pointer" }} onClick={() => history.push(props.link)} className={`activity-container border-${props.theme}`}>
            <div className="activity-details">
                <div className="activity-details-head">
                    <span className="activity-details-title">
                        <strong>{activity.title}</strong>
                    </span>
                </div>
                <div>{getDate(activity.dueDate)}</div>
            </div>
            <div className="activity-marks">
                <strong>Max Marks:</strong>
                <strong>
                    <span>{activity.maxMarks}</span>
                </strong>
            </div>
        </div>
    );
};

export default ToDo;

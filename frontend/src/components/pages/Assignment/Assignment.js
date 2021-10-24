import React from "react";
import "./Assignment.scss";
import Paperclip from "./Paperclip";
import Send from "./Send";
import assignment from "../../../Dummy-data/assignment-dummy";

function Assignment() {
    const d = assignment.createdAt
        .toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
        })
        .split(",");
    const dueDate = d[0] + d[1].toUpperCase();
    return (
        <div className="asg-container">
            <div className="asg-container1">
                <h4>Not Submitted</h4>
                <h5>
                    Submit By{" "}
                    <span className="asg-theme">{assignment.dueDate}</span>
                </h5>
                <br />
                <h5>Attachments:</h5>
                <div className="asg-attachments">
                    <div className="attachment-component-type1">
                        <Paperclip />
                        <div className="asg-attachment-filename">
                            <div className="bold">M2-Life Cycle Models.pdf</div>
                            <div>DOCUMENT</div>
                        </div>
                    </div>
                </div>
                <div className="attach-submit-container">
                    <div className="attach-submit">
                        <Paperclip />
                    </div>
                    <div className="attach-submit bold">
                        SUBMIT <Send />
                    </div>
                </div>
            </div>

            <div className="asg-container2">
                <div className="asg-detail">
                    <span className="asg-heading">
                        <h3>{assignment.title}</h3>
                        <h3 className="asg-points asg-theme">
                            {assignment.maxMarks} points
                        </h3>
                    </span>
                    <div className="asg-text">{assignment.body}</div>
                    <div className="attachment-component-type2">
                        <Paperclip />
                        <div className="asg-attachment-filename">
                            <div className="bold">Template SRS.pdf</div>
                            <div>DOCUMENT</div>
                        </div>
                    </div>
                    <div className="asg-posted">Posted {dueDate}</div>
                </div>
                <div className="asg-comment">
                    <input placeholder="Write a Comment..."></input>
                    <div className="submit-btn-theme">
                        <Send />
                    </div>
                </div>
                <div className="asg-class-comments">
                    <h3>Class Comments</h3>
                    <div className="asg-class-comment">
                        <h6 className="bold">Aaryak Shah</h6> Lorem ipsum dolor
                        sit, amet consectetur adipisicing elit. Cum, iusto. Quo
                        tempore ab ipsum necessitatibus quos, explicabo unde
                        excepturi, eveniet dignissimos sequi adipisci. Mollitia
                        maiores consequuntur tempore sit nisi! Dolore!
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Assignment;

import React, { useEffect, useState } from "react";
import "./Assignment.scss";
import Paperclip from "./Paperclip";
import Send from "./Send";
import { useParams } from "react-router";
import { getAssignmentDetails } from "../../../axios/assignment";
import FileAtt from "../../common/fileAtt/FileAtt";
import { postComment } from "../../../axios/comment";

function Assignment() {
    const getDate = (givenDate) => {
        if (!givenDate) return;
        const date = new Date(givenDate);
        const d = date.toLocaleDateString("en-GB", { day: "numeric", month: "long", year: "numeric", hour12: true, hour: "2-digit", minute: "2-digit" }).split(",");
        const finalDate = d[0] + d[1].toUpperCase();
        return finalDate;
    };
    const [body, setBody] = useState("");
    const { classroomID, assignmentID } = useParams();
    const [assignment, setAssignment] = useState({});
    console.log("asgDetails:", assignment);
    const handleCommentSubmit = (e) => {
        e.preventDefault();
        const data = { body, postID: assignmentID, postType: "asg", classroomID };
        postComment(data).then((res) => {
            console.log("comments res", res);
            setAssignment({ ...assignment, commentIDs: [res.data, ...assignment.commentIDs] });
        });
        setBody("");
    };
    useEffect(() => {
        getAssignmentDetails({ classroomID, assignmentID })
            .then((res) => {
                setAssignment(res.data);
            })
            .catch((e) => {
                console.error(e);
            });
        return;
    }, [classroomID, assignmentID]);
    return (
        <div className="asg-container">
            <div className="asg-container1">
                <h4>Not Submitted</h4>
                <h5>
                    Submit By <span className="asg-theme">{getDate(assignment.dueDate)}</span>
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
                        <h3 className="asg-points asg-theme">{assignment.maxMarks} points</h3>
                    </span>
                    <div className="asg-text">{assignment.body}</div>
                    <div className="attachments">
                        {assignment.fileIDs
                            ? assignment.fileIDs.map((file, key) => {
                                  return <FileAtt key={key} fileData={file} />;
                              })
                            : null}
                    </div>
                    <div className="asg-posted">Posted {getDate(assignment.createdAt)}</div>
                </div>
                <form className="asg-comment" onSubmit={handleCommentSubmit}>
                    <input
                        placeholder="Write a Comment..."
                        onChange={(e) => {
                            setBody(e.target.value);
                        }}
                        value={body}
                    ></input>
                    <button className="submit-btn-theme">
                        <Send />
                    </button>
                </form>
                <div className="asg-class-comments">
                    <h3>Class Comments</h3>
                    <div className="asg-class-comment">
                        {assignment.commentIDs
                            ? assignment.commentIDs.map((comment, key) => {
                                  return (
                                      <>
                                          <h6 className="bold">{comment.userID.name}</h6> {comment.body}
                                      </>
                                  );
                              })
                            : null}
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Assignment;

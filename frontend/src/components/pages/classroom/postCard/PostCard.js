import "./PostCard.scss";
import FileAtt from "../fileAtt/FileAtt";

import React from "react";
import { useHistory } from "react-router";

function formatDate(datestr) {
    // console.log("formatting", typeof date);
    const date = new Date(datestr);
    const d = date
        .toLocaleDateString("en-GB", {
            day: "numeric",
            month: "long",
            year: "numeric",
            hour12: true,
            hour: "2-digit",
            minute: "2-digit",
        })
        .split(",");
    return d[0] + d[1].toUpperCase();
}

function PostCard({ postType, theme, content, classroomID }) {
    const history = useHistory();
    const openAsg = (postType) => {
        if (postType === "asg") {
            history.push(`/class/${classroomID}/asg/${content._id}`);
        }
    };
    return (
        <div onClick={() => openAsg(postType)} className={`post-card border-${theme} ${postType}-card`}>
            {postType === "asg" && <h5 className={`asg-marker font-${theme}`}>ASSIGNMENT &bull; DUE {formatDate(content.dueDate)}</h5>}
            <h2>{content.title}</h2>
            <div className="subtitle">
                <h5 className="post-auth">{postType === "asg" ? content.facultyID.name : content.userID.name}</h5>
                <h5>&bull;</h5>
                <h5 className="post-date">10:46AM 24th September 2021</h5>
            </div>
            {content.body ? <p>{content.body}</p> : null}
            <div className="attachments">
                {content.fileIDs.map((file, key) => {
                    return <FileAtt key={key} fileData={file} />;
                })}
            </div>
        </div>
    );
}

export default PostCard;

import "./PostCard.scss";
import FileAtt from "../fileAtt/FileAtt";

import React from "react";

function PostCard({ postType, theme }) {
    return (
        <div className={`post-card border-${theme}`}>
            {postType === "asg" && <h5 className={`asg-marker font-${theme}`}>ASSIGNMENT &bull; DUE 10:00AM 24th Oct 2021</h5>}
            <h2>Lorem ipsum dolor sit amet consectetur.</h2>
            <div className="subtitle">
                <h5 className="post-auth">John Doe</h5>
                <h5>&bull;</h5>
                <h5 className="post-date">10:46AM 24th September 2021</h5>
            </div>
            <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. In beatae omnis possimus asperiores facilis, eum provident corporis modi ex ut nobis, laboriosam dolorum, iste corrupti? Cum
                temporibus dolore voluptatum iure, nesciunt eum officiis. Saepe, ut itaque at, eos explicabo corrupti nobis quo eaque error ratione odit assumenda atque officiis veritatis amet vero
                fugit possimus, facere aspernatur impedit. Exercitationem, recusandae dolore?
            </p>
            <div className="attachments">
                <FileAtt />
                <FileAtt />
            </div>
        </div>
    );
}

export default PostCard;

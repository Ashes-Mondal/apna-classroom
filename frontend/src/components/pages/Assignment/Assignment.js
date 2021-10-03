import React from "react";
import "./Assignment.scss";
import Paperclip from "./Paperclip";
import Send from "./Send";

function Assignment() {
  return (
    <div className="asg-container">
      <div className="asg-container1">
        <h4>Not Submitted</h4>
        <h5>
          Submit By <span className="asg-theme">9th Sept 11:59PM</span>
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
            <h3>SE Lab Assignment 2</h3>
            <h3 className="asg-points asg-theme">100 points</h3>
          </span>
          <div className="asg-text">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Distinctio
            eius nisi eveniet dolorem ipsum esse rem alias beatae asperiores
            quidem molestiae voluptatem laboriosam ipsam deleniti obcaecati,
            iusto animi accusantium voluptatibus.
          </div>
          <div className="attachment-component-type2">
            <Paperclip />
            <div className="asg-attachment-filename">
              <div className="bold">Template SRS.pdf</div>
              <div>DOCUMENT</div>
            </div>
          </div>
          <div className="asg-posted">Posted 12th Sep 1:00PM</div>
        </div>
        <div className="asg-comment">
          Write a Comment... <Send className="submit-btn-theme" />
        </div>
        <div className="asg-class-comments">
          <h3>Class Comments</h3>
          <div className="asg-class-comment">
            <h6 className="bold">Aaryak Shah</h6> Lorem ipsum dolor sit, amet
            consectetur adipisicing elit. Cum, iusto. Quo tempore ab ipsum
            necessitatibus quos, explicabo unde excepturi, eveniet dignissimos
            sequi adipisci. Mollitia maiores consequuntur tempore sit nisi!
            Dolore!
          </div>
        </div>
      </div>
    </div>
  );
}

export default Assignment;

import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Banner from "./banner/Banner";
import PostCard from "./postCard/PostCard";
import "./Classroom.scss";
import MiniToDo from "./miniToDo/MiniToDo";
import { useParams } from "react-router";
import AddAnnModal from "./addAnnModal/AddAnnModal";
import AddAsgModal from "./addAsgModal/AddAsgModal";
import { getPostFeed } from "../../../axios/classroom";
import img from "../../../images/no-data/no-data.jpg";

function Classroom() {
    const { classroomID } = useParams();
    let enrolledClassrooms = [];
    enrolledClassrooms = useSelector((state) => state.enrolledClassrooms);
    console.log("enrolledc:", enrolledClassrooms);
    const currentClassroom = enrolledClassrooms.find((item) => item._id === classroomID);
    console.log("currclass:", currentClassroom);
    let [feed, setFeed] = useState([]);
    useEffect(() => {
        getPostFeed(classroomID).then((res) => {
            console.log("feed gotten", res);
            setFeed(res.data);
        });
        return;
    }, []);

    return (
        <div>
            <Banner currentClassroom={currentClassroom} />
            <div className="feed">
                <div className="left-column">
                    {/* <div className="post-cta"></div> */}
                    {feed.length ? (
                        feed.map((post, key) => {
                            return <PostCard classroomID={classroomID} key={key} content={post} postType={post.dueDate ? "asg" : "ann"} theme={currentClassroom.theme} />;
                        })
                    ) : (
                        <div className="no-data-class-img">
                            <img src={img} alt="no-data" />
                        </div>
                    )}
                    {/* <PostCard theme={currentClassroom.theme} />
                    <PostCard postType="asg" theme={currentClassroom.theme} />
                    <PostCard postType="asg" theme={currentClassroom.theme} />
                    <PostCard theme={currentClassroom.theme} /> */}
                </div>
                <div className="right-column">
                    <AddAnnModal classroomID={classroomID} theme={currentClassroom.theme} />
                    <AddAsgModal classroomID={classroomID} theme={currentClassroom.theme} />
                    <MiniToDo />
                </div>
            </div>
        </div>
    );
}

export default Classroom;

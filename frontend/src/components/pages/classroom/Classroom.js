import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Banner from "./banner/Banner";
import PostCard from "./postCard/PostCard";
import "./Classroom.scss";
import MiniToDo from "./miniToDo/MiniToDo";
import { useParams } from "react-router";
import AddAnnModal from "./addAnnModal/AddAnnModal";
import AddAsgModal from "./addAsgModal/AddAsgModal";
import { getPostFeed } from "../../../axios/classroom";
import img from "./no-data.png";
import { setLoading, unsetLoading } from "../../../redux/actions/loading";

function Classroom() {
    const { classroomID } = useParams();
    const [feed, setFeed] = useState([]);
    const enrolledClassrooms = useSelector((state) => state.enrolledClassrooms);
    const [currentClassroom, setCurrentClassroom] = useState({});
    const dispatch = useDispatch();
    const loading = useSelector((state) => state.loading);
    const user = useSelector((state) => state.user);

    useEffect(() => {
        dispatch(setLoading());
        getPostFeed(classroomID).then((res) => {
            setFeed(res.data);
            dispatch(unsetLoading());
        });
        return;
    }, [classroomID, dispatch]);
    useEffect(() => {
        setCurrentClassroom(enrolledClassrooms.find((item) => item._id === classroomID) || {});
        return;
    }, [enrolledClassrooms, classroomID]);

    return (
        <div>
            <Banner currentClassroom={currentClassroom} />
            <div className="feed">
                <div className="left-column">
                    {feed.length ? (
                        feed.map((post, key) => {
                            return <PostCard classroomID={classroomID} key={key} content={post} postType={post.dueDate ? "asg" : "ann"} theme={currentClassroom.theme} />;
                        })
                    ) : loading ? null : (
                        <div className="no-data-class-img">
                            <img src={img} alt="no-data" />
                            <div>Nothing to see here.</div>
                        </div>
                    )}
                </div>
                <div className="right-column">
                    <AddAnnModal classroomID={classroomID} theme={currentClassroom.theme} />
                    <AddAsgModal classroomID={classroomID} theme={currentClassroom.theme} />
                    {user.role === "student" ? <MiniToDo classroomID={classroomID} /> : null}
                </div>
            </div>
        </div>
    );
}

export default Classroom;

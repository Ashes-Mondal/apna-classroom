import React from "react";
import { useSelector } from "react-redux";
import Card from "../../common/cards/Card";
import "./Home.scss";
import NewClassroomModal from "./NewClassroomModal";

const Home = () => {
    const enrolledClassrooms = useSelector((state) => state.enrolledClassrooms);
    return (
        <>
            <div className="class-grid">
                {enrolledClassrooms.map((item, idx) => (
                    <Card key={idx} details={item} />
                ))}
            </div>
            <NewClassroomModal />
        </>
    );
};

export default Home;

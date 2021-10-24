import React from "react";
import Card from "../../common/cards/Card";
import "./Home.scss";
import NewClassroomModal from "./NewClassroomModal";

const Home = () => {
    return (
        <>
            <div className="class-grid">
                <Card />
                <Card theme="red" />
                <Card theme="blue" />
                <Card theme="purple" />
                <Card theme="yellow" />
                <Card theme="green" />
                <Card theme="orange" />
                <Card />
                <Card theme="red" />
                <Card theme="blue" />
                <Card theme="purple" />
                <Card theme="yellow" />
                <Card theme="green" />
                <Card theme="orange" />
                <Card />
                <Card theme="red" />
                <Card theme="blue" />
                <Card theme="purple" />
                <Card theme="yellow" />
                <Card theme="green" />
                <Card theme="orange" />
                <Card />
                <Card theme="red" />
                <Card theme="blue" />
                <Card theme="purple" />
                <Card theme="yellow" />
                <Card theme="green" />
                <Card theme="orange" />
            </div>
            <NewClassroomModal />
        </>
    );
};

export default Home;

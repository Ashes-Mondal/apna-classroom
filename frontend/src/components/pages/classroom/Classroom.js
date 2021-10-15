import React from 'react'
import Banner from './banner/Banner'
import PostCard from './postCard/PostCard'
import './Classroom.scss'
import MiniToDo from './miniToDo/MiniToDo'
import { useParams } from 'react-router'

function Classroom() {
    const {classroomID} = useParams();
    return (
        <div>
            <Banner />
            <div className="feed">
                <div className="left-column">
                    <div className="post-cta"></div>
                    <PostCard />
                    <PostCard postType="asg" />
                    <PostCard postType="asg" />
                    <PostCard />
                </div>
                <div className="right-column">
                    <MiniToDo />
                </div>
            </div>
        </div>
    )
}

export default Classroom

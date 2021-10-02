import React from 'react'
import Banner from './banner/Banner'

function Classroom() {
    return (
        <div>
            <Banner />
            <div className="feed">
                <div className="left-column">
                    <div className="post-cta"></div>
                    <div className="post-card"></div>
                    <div className="post-card"></div>
                    <div className="post-card"></div>
                    <div className="post-card"></div>
                </div>
                <div className="right-column"></div>
            </div>
        </div>
    )
}

export default Classroom

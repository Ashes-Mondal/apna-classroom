import React from 'react'
import './Banner.scss'

function Banner() {
    return (
        <div className="banner">
            <div className="info">
                <h1>Software Engineering</h1>
                <h3>5th Semester | 2019 IPG MTech</h3>
            </div>
            <div className="actions">
                <button>
                    <div className="act-icon" /> Meeting
                </button>
                <button>
                    <div className="act-icon" /> Results
                </button>
            </div>
        </div>
    )
}

export default Banner

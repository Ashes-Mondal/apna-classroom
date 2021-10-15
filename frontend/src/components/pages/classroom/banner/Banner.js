import React from 'react'
import { FaVideo, FaClipboard } from 'react-icons/fa'
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
                    <FaVideo /> Meeting
                </button>
                <button>
                    <FaClipboard /> Results
                </button>
            </div>
        </div>
    )
}

export default Banner

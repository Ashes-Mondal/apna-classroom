import React, { useState } from 'react'
import './Card.scss'
import { BiDotsVerticalRounded } from "react-icons/bi";
import { SiGooglehangoutsmeet } from "react-icons/si";
import { HiOutlineClipboardList } from "react-icons/hi";

const list = [
    {
        title: 'Unroll',
        handler: () => alert('unroll handler called...')
    }
]
const Dropdown = () => {
    const [open, setOpen] = useState(false)
    return (
        <div className="dropdown">
            <button className="dropbtn" onClick={() => setOpen(!open)}><BiDotsVerticalRounded size={30} /></button>
            <div className="dropdown-content" style={open ? { display: "block" } : {}}>
                {
                    list.map((item, idx) =>
                        <span key={idx} onClick={() => {
                            item.handler();
                            setOpen(false);
                        }}>{item.title}</span>
                    )
                }
            </div>
        </div>
    );
};

const details = {
    theme: '',
    facultyName: 'Santosh Singh Rathore',
    subjectName: 'Software Engineering',
    batchCode: 'IPG 2019',
    semester: 5
}

const Card = ({ theme }) => {
    return (
        <div className={`card subject-card bg-${theme}`}>
            <div className="card-body">
                <div className="subject-body">
                    <h5 className={`card-title subject-name font-${theme}`}>{details.subjectName}</h5>
                    <h6 id='subject-description'>{`${details.batchCode} | Semester ${details.semester} `}</h6>
                    <h6 id='subject-faculty'>{details.facultyName}</h6>
                </div>
                <span className="three-dots"><Dropdown /></span>
            </div>
            <div className='card-bottom'>
                <span><HiOutlineClipboardList /> Todo</span>
                <span><SiGooglehangoutsmeet /> Meeting</span>
            </div>
        </div>
    )
}

export default Card

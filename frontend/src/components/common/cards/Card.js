import React, { useMemo, useState } from 'react'
import './Card.scss'
import { BiDotsVerticalRounded } from "react-icons/bi";
import { SiGooglehangoutsmeet } from "react-icons/si";
import { HiOutlineClipboardList } from "react-icons/hi";
import { useHistory } from 'react-router';

const Dropdown = (props) => {
    const [open, setOpen] = useState(false)
    return (
        <div className="dropdown">
            <button className="dropbtn" onClick={() => setOpen(!open)}><BiDotsVerticalRounded size={30} /></button>
            <div className="dropdown-content" style={open ? { display: "block" } : {}}>
                {
                    props.list.map((item, idx) =>
                        <span key={idx} onClick={async() => {
                            await item.handler();
                            setOpen(false);
                        }}>{item.title}</span>
                    )
                }
            </div>
        </div>
    );
};

const Card = (props) => {
    const history = useHistory();
    const {details} = props;
    const list = useMemo(() => [
        {
            title: 'Unroll',
            handler: () => alert('unroll handler called...')
        }
    ], [])
    
    return (
        <div className={`card subject-card bg-${details.theme}`}>
            <div className="card-body">
                <div className="subject-body" onClick={()=>history.push(`/class/${details._id}`)}>
                    <h5 className={`card-title subject-name font-${details.theme}`}>{details.subjectName}</h5>
                    <h6 id='subject-description'>{`${details.batchCode} | Semester ${details.semester} `}</h6>
                    <h6 id='subject-faculty'>{details.facultyName}</h6>
                </div>
                <span className="three-dots"><Dropdown list={list}/></span>
            </div>
            <div className='card-bottom'>
                <span onClick={()=>history.push(`/class/${details._id}/todos`)}><HiOutlineClipboardList /> Todo</span>
                <span onClick={()=>history.push(`/class/${details._id}/meeting`)}><SiGooglehangoutsmeet /> Meeting</span>
            </div>
        </div>
    )
}

export default Card

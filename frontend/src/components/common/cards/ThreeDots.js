import React, { useMemo, useState } from "react";
import { BiDotsVerticalRounded } from "react-icons/bi";
import { AiFillCloseCircle } from "react-icons/ai";
import { useDispatch, useSelector } from "react-redux";
import { unrollStudentFromClassroom } from "../../../axios/classroom";
import { removeFromClassroom } from "../../../redux/actions/enrolledClassrooms";
import { removeClassroomTheme } from "../../../redux/actions/theme";
import "./Card.scss";

const ThreeDots = (props) => {
    const user = useSelector((state) => state.user);
    const dispatch = useDispatch();
    const { details } = props;
    const [open, setOpen] = useState(false);
    const [openModal, setOpenModal] = useState(0);

    const list = useMemo(() => {
        if (user.role.toLowerCase() === "student")
            return [
                {
                    title: "Unroll",
                    handler: () => {
                        const classID = details._id;
                        unrollStudentFromClassroom({ classID })
                            .then((resp) => {
                                dispatch(removeFromClassroom(classID));
                                dispatch(removeClassroomTheme(classID));
                                alert(resp);
                            })
                            .catch((e) => {
                                console.error(e);
                            });
                    },
                },
            ];
        return [
            {
                title: "Add Student",
                handler: () => {
                    setOpenModal(1);
                    alert("Add Student handler");
                },
            },
            {
                title: "Add Assistant",
                handler: () => {
                    setOpenModal(2);
                    alert("Add Assistant handler");
                },
            },
            {
                title: "remove Student",
                handler: () => {
                    setOpenModal(3);
                    alert("Add Assistant handler");
                },
            },
            {
                title: "remove Assistant",
                handler: () => {
                    setOpenModal(4);
                    alert("Remove Assistant handler");
                },
            },
        ];
    }, [user, details, dispatch]);
    return (
        <div className="dropdown">
            {openModal ? <div onClick={setOpenModal(0)}>MODAL OPENED</div> : null}
            
            <button className="dropbtn" onClick={() => setOpen(!open)}>
            {!open?<BiDotsVerticalRounded size={30} />:<AiFillCloseCircle size={30}/>}
            </button>
            <div className="dropdown-content" style={open ? { display: "block" } : {}}>
                {list.map((item, idx) => (
                    <span
                        key={idx}
                        onClick={async () => {
                            await item.handler();
                            setOpen(false);
                        }}
                    >
                        {item.title}
                    </span>
                ))}
            </div>
        </div>
    );
};

export default ThreeDots;

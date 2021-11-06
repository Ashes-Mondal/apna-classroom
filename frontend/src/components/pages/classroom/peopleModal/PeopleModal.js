import "./PeopleModal.scss";
import React from "react";
import { GrFormClose } from "react-icons/gr";

function PeopleModal({ people, setShowPeople, theme }) {
    const closeOnOverlayClick = (e) => {
        if (e.target.classList[0] === "overlay") {
            // console.log("overlay click");
            setShowPeople(false);
        }
        if (e.target.classList[0] === "people-modal") {
            // console.log("form click");
        }
    };
    const emailToRNo = (email) => {
        return email.slice(4, 8) + email.slice(0, 3).toUpperCase() + "-" + email.slice(8, 11);
    };
    return (
        <div className="overlay" onClick={closeOnOverlayClick}>
            <div className="people-modal">
                <div className="class-teachers">
                    <h4>Teachers</h4>
                    <div className="teachers-list">
                        {people
                            .filter((p) => p.role !== "student")
                            .map((p) => {
                                return (
                                    <div className="person">
                                        <div className={`avatar bg-${theme}`}>{p.name[0]}</div>
                                        <div className="name">{p.name}</div>
                                    </div>
                                );
                            })}
                    </div>
                    <h4>Students</h4>
                    <div className="teachers-list">
                        {people
                            .filter((p) => p.role === "student")
                            .map((p) => {
                                return (
                                    <div className="person">
                                        <div className={`avatar bg-${theme}`}>{p.name[0]}</div>
                                        <div className="name">
                                            {p.name} &bull; {emailToRNo(p.email)}
                                        </div>
                                    </div>
                                );
                            })}
                    </div>
                </div>
                <div className="formclose-btn" onClick={() => setShowPeople(false)}>
                    <GrFormClose />
                </div>
            </div>
        </div>
    );
}

export default PeopleModal;
